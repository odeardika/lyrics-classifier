import numpy as np
from collections import Counter
import re
from cvxopt import matrix, solvers
from scipy.special import logsumexp


class MultinomialNaiveBayes:
    def fit(self, X, y):
        self.classes = np.unique(y)
        self.class_priors = {}
        self.feature_likelihoods = {}
        self.join_log_likelihoods = []

        # for each class calculate prior and likelihoods
        for cls in self.classes:
            X_cls = X[y == cls]

            # class prior = total this class / total dataset
            self.class_priors[cls] = X_cls.shape[0] / X.shape[0]

            # feature likelihoods = array with cols eq to total feature
            # for each feature, sum all occurrence of that feature
            # divide it by (sum features in that class + total feature)
            self.feature_likelihoods[cls] = (np.sum(X_cls, axis=0) + 1) / (np.sum(X_cls) + X.shape[1])

    def predict_proba_percent(self, X):
        """Returns probability percentages in {class: percentage} format"""
        probabilities = []
        
        for x in X:
            log_posteriors = {}
            
            # Calculate log posteriors for each class (same as predict() logic)
            for cls in self.classes:
                log_posterior = np.log(self.class_priors[cls])
                log_posterior += np.sum(np.log(self.feature_likelihoods[cls]) * x)
                log_posteriors[cls] = log_posterior
            
            # Convert to numpy array of log probabilities
            log_probs = np.array(list(log_posteriors.values()))
            
            # Normalize using logsumexp to get probabilities
            log_probs_normalized = log_probs - logsumexp(log_probs)
            class_probs = np.exp(log_probs_normalized) * 100
            
            # Create dictionary with class labels
            prob_dict = {
                cls: round(class_probs[i], 4)
                for i, cls in enumerate(log_posteriors.keys())
            }
            
            probabilities.append(prob_dict)
        
        return probabilities

    def predict(self, X):
        predictions = []

        # for each data
        for x in X:
            posteriors = {}


            # for each class
            for cls in self.classes:

                # normal
                # posterior = (self.class_priors[cls])
                # posterior *= np.prod(np.power(self.feature_likelihoods[cls], x))

                # problem with normal is too small result, because fraction * fraction
                # for example 0.3 * 0.5 * ......
                # log version
                log_posterior = np.log(self.class_priors[cls])

                # math time
                # log(A^B) = log(A) * B
                # log(likelihoods ^ x ) = log(likelihoods) * x
                # log(a*b) = log(a) + log(b), then:
                # np.prod => np.sum
                log_posterior += np.sum(np.log(self.feature_likelihoods[cls]) * x)

                # add to class posterior
                posteriors[cls] = log_posterior

            # predict the class by choosing the highst log posterior
            self.join_log_likelihoods.append(list(posteriors.values()))
            predictions.append(max(posteriors, key=posteriors.get))
            # same as np.argmax(list(posteriors.values()))

        return np.array(predictions)
    

class TFIDF:
    def __init__(self):
        self.word_counter = None
        self.index_to_word = None
        self.word_to_index = None
        self.document_frequency = None
        self.n_docs = 0
        self.n_vocab = 0

    def _clean_data(self, data: list[str]) -> list[str]:
        """Cleans and preprocesses data by removing non-alphabet characters and lowering case."""
        return [' '.join(re.findall(r'[a-zA-Z]+', sentence)).lower() for sentence in data]

    def _build_vocab(self, cleaned_data: list[str]) -> list[str]:
        """Builds vocabulary and mappings from cleaned data."""
        word_list = [word for sentence in cleaned_data for word in sentence.split()]
        self.word_counter = dict(sorted(Counter(word_list).items()))
        self.index_to_word = {idx: word for idx, word in enumerate(self.word_counter.keys())}
        self.word_to_index = {word: idx for idx, word in enumerate(self.word_counter.keys())}
        self.n_vocab = len(self.word_counter)

    def _calculate_document_frequency(self, cleaned_data):
        """Calculates document frequency for each word."""
        self.document_frequency = {word: 0 for word in self.word_to_index.keys()}
        for sentence in cleaned_data:
          splitted_sentence = sentence.split(" ")
          unique_word = np.unique(splitted_sentence)
          for word in unique_word:
            self.document_frequency[word] += 1

    def _calculate_tfidf(self, sentence):
        """Calculates the TF-IDF vector for a single sentence."""
        counter = Counter(sentence.split())
        row_sum = 0
        tfidf_vector = np.zeros(self.n_vocab)

        for j in range(self.n_vocab):
            word = self.index_to_word[j]
            # term frequency only caculated from freq on the sentence
            # same as BoW (sklearn references)
            tf = counter.get(word, 0)
            df = self.document_frequency.get(word, 0)
            # references: https://scikit-learn.org/1.5/modules/generated/sklearn.feature_extraction.text.TfidfTransformer.html
            # adding 1 on n and df -> smoothing
            idf = np.log((1 + self.n_docs) / (1 + df)) + 1
            tf_idf = tf * idf

            row_sum += np.square(tf_idf)
            tfidf_vector[j] = tf_idf

        l2_norm = np.sqrt(row_sum)
        if l2_norm > 0:
            tfidf_vector /= l2_norm

        return tfidf_vector

    def fit(self, data):
        """Fits the model on the data"""
        cleaned_data = self._clean_data(data)
        self.n_docs = len(cleaned_data)
        self._build_vocab(cleaned_data)
        self._calculate_document_frequency(cleaned_data)
        return self

    def transform(self, data):
        """Transforms new data based on the already fitted vocabulary and document frequencies."""
        if self.word_to_index is None or self.document_frequency is None:
            raise ValueError("The TFIDF model must be fitted before calling transform.")

        cleaned_data = self._clean_data(data)
        transformed_matrix = np.array([self._calculate_tfidf(sentence) for sentence in cleaned_data])
        return transformed_matrix

    def fit_transform(self, data):
        self.fit(data)
        return self.transform(data)
    
class SVM:
    def __init__(self, C=1.0, tol=1e-5):
        """
        Inisialisasi model SVM.
        
        Parameter:
        - C (float): Parameter regularisasi (default: 1.0)
        - tol (float): Toleransi untuk identifikasi support vectors (default: 1e-5)
        """
        self.C = C
        self.tol = tol
        self.w = None  # Vektor bobot (weight vector)
        self.b = None  # Bias
        self.support_vectors_ = None  # Support vectors
        self.alphas = None  # Lagrange multipliers (alpha)
        self.sv_y = None  # Label support vectors

    def fit(self, X, y):
        """
        Melatih model SVM menggunakan formulasi dual dan quadratic programming.
        
        Parameter:
        - X (np.array): Matriks fitur berukuran (n_samples, n_features)
        - y (np.array): Vektor label berukuran (n_samples,)
        """
        n_samples, n_features = X.shape
        
        # Pastikan y berbentuk vektor kolom dan bertipe float
        y = y.reshape(-1, 1).astype(np.float64)
        
        # --- Langkah 1: Hitung Gram matrix untuk kernel linear ---
        # K_ij = X_i · X_j (dot product)
        # Sesuai rumus: K = X @ X.T
        K = np.dot(X, X.T)
        
        # --- Langkah 2: Siapkan parameter quadratic programming (QP) ---
        # Quadratic term: P_ij = y_i y_j K_ij
        # Sesuai rumus: P = np.outer(y, y) * K
        P = matrix(np.outer(y, y) * K)  # (n_samples, n_samples)
        
        # Linear term: q = -1 (karena kita memaksimalkan sum(alpha) - 0.5*alpha^T P alpha)
        q = matrix(-np.ones((n_samples, 1)))  # (n_samples, 1)
        
        # --- Kendala Inequality: 0 <= alpha_i <= C ---
        # Bentuk matriks G dan h untuk kendala box:
        # -alpha_i <= 0 --> G_upper = -I, h_upper = 0
        # alpha_i <= C  --> G_lower = I, h_lower = C
        G_upper = -np.eye(n_samples)  # Bagian untuk -alpha_i <= 0
        G_lower = np.eye(n_samples)   # Bagian untuk alpha_i <= C
        G = matrix(np.vstack((G_upper, G_lower)))  # Gabung kedua bagian
        
        h_upper = np.zeros((n_samples, 1))
        h_lower = np.ones((n_samples, 1)) * self.C
        h = matrix(np.vstack((h_upper, h_lower)))  # (2*n_samples, 1)
        
        # --- Kendala Equality: sum(alpha_i y_i) = 0 ---
        # Bentuk matriks A dan b
        A = matrix(y.T.astype(np.float64))  # (1, n_samples)
        b = matrix(0.0)  # Skalar 0
        
        # --- Langkah 3: Solve QP problem ---
        solvers.options['show_progress'] = False  # Nonaktifkan output solver
        solution = solvers.qp(P, q, G, h, A, b)
        
        # Ekstrak solusi alpha
        alphas = np.ravel(solution['x'])  # (n_samples,)
        
        # --- Langkah 4: Identifikasi Support Vectors ---
        # Support vectors adalah sampel dengan alpha_i > toleransi
        sv_mask = alphas > self.tol
        self.support_vectors_ = X[sv_mask]
        self.alphas = alphas[sv_mask]
        self.sv_y = y[sv_mask]
        
        # --- Langkah 5: Hitung Bobot (w) dan Bias (b) ---
        # Rumus bobot: w = sum(alpha_i y_i X_i)
        self.w = np.sum(self.alphas[:, np.newaxis] * self.sv_y * self.support_vectors_, axis=0)
        
        # Rumus bias: b = rata-rata(y_i - w·X_i) untuk semua support vectors
        self.b = np.mean(self.sv_y - np.dot(self.support_vectors_, self.w))
        
    def predict(self, X):
        """
        Melakukan prediksi pada data baru.
        
        Parameter:
        - X (np.array): Matriks fitur berukuran (n_samples, n_features)
        
        Returns:
        - Prediksi kelas (0 atau 1) sebagai np.array
        """
        # Hitung nilai decision function: f(x) = w·X + b
        decision_values = np.dot(X, self.w) + self.b
        
        # Terapkan aturan threshold: f(x) >= 0 → kelas 1, else kelas 0
        return np.where(decision_values >= 0, 1, 0).astype(int)