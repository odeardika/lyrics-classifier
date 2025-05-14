from sklearn.model_selection import KFold
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

import numpy as np

def KFoldValidation(naive_bayes, svm, X, y, n_splits=5):
    # Create copies of the models
    from copy import deepcopy
    nb = deepcopy(naive_bayes)
    sv = deepcopy(svm)
    
    print("Output deepcopy Naive Bayes :")
    print(nb)
    print("Output deepcopy SVM :")
    print(sv)
    
    kf = KFold(n_splits=n_splits, shuffle=True, random_state=42)
    
    # Initialize metric collections for both models
    metrics = {
        'naive_bayes': {'accuracy': [], 'precision': [], 'recall': [], 'f1': []},
        'svm': {'accuracy': [], 'precision': [], 'recall': [], 'f1': []}
    }
    
    # Use the same fold splits for both models
    for train_index, test_index in kf.split(X):
        X_train, X_test = X[train_index], X[test_index]
        y_train, y_test = y[train_index], y[test_index]
        
        print(f"Data Latih : {len(X_train)} Lirik Lagu")
        print(X_train)
        print(f"Data Uji : {len(X_test)} Lirik Lagu")
        print(X_test)
        
        # Train and evaluate Naive Bayes
        nb_clone = deepcopy(nb)
        nb_clone.fit(X_train, y_train)
        y_pred_nb = nb_clone.predict(X_test)
        
        metrics['naive_bayes']['accuracy'].append(accuracy_score(y_test, y_pred_nb))
        metrics['naive_bayes']['precision'].append(precision_score(y_test, y_pred_nb, average='weighted'))
        metrics['naive_bayes']['recall'].append(recall_score(y_test, y_pred_nb, average='weighted'))
        metrics['naive_bayes']['f1'].append(f1_score(y_test, y_pred_nb, average='weighted'))
        
        # Train and evaluate SVM
        svm_clone = deepcopy(sv)
        svm_clone.fit(X_train, np.where(y_train <= 0, -1, 1))
        y_pred_svm = svm_clone.predict(X_test)
        
        print("Hasil Prediksi Naive Bayes :")
        print(y_pred_nb)
        print("Hasil Prediksi SVM :")
        print(y_pred_svm)
        
        metrics['svm']['accuracy'].append(accuracy_score(y_test, y_pred_svm))
        metrics['svm']['precision'].append(precision_score(y_test, y_pred_svm, average='weighted'))
        metrics['svm']['recall'].append(recall_score(y_test, y_pred_svm, average='weighted'))
        metrics['svm']['f1'].append(f1_score(y_test, y_pred_svm, average='weighted'))
    
    # Calculate summary statistics for both models
    results = {}
    for model_name in ['naive_bayes', 'svm']:
        results[model_name] = {
            'metrics': {}
        }
        for metric in ['accuracy', 'precision', 'recall', 'f1']:
            scores = metrics[model_name][metric]
            results[model_name]['metrics'][metric] = {
                'mean': np.mean(scores),
                'std': np.std(scores),
                'scores': scores
            }
    
    # Train final models on the entire dataset
    naive_bayes.fit(X, y)
    svm.fit(X_train, np.where(y_train <= 0, -1, 1))
    
    # Add final models to results
    results['naive_bayes']['final_model'] = naive_bayes
    results['svm']['final_model'] = svm
    
    # Determine which model performed better based on F1 score
    # You can change this to any metric you prioritize
    nb_f1 = results['naive_bayes']['metrics']['f1']['mean']
    svm_f1 = results['svm']['metrics']['f1']['mean']
    
    better_model_name = "Naive Bayes" if nb_f1 > svm_f1 else "SVM"
    better_model = naive_bayes if nb_f1 > svm_f1 else svm
    
    results['better_model_name'] = better_model_name
    results['better_model'] = better_model
    
    return results

# Example usage:
# from sklearn.naive_bayes import GaussianNB
# from sklearn.svm import SVC
#
# nb_model = GaussianNB()
# svm_model = SVC(kernel='rbf', random_state=42)
#
# results = compare_models_with_kfold(nb_model, svm_model, X, y, n_splits=5)
#
# # Access the final trained models
# final_nb_model = results["naive_bayes"]["final_model"]
# final_svm_model = results["svm"]["final_model"]
# 
# # Or just get the better model
# best_model = results["better_model"]
#
# # Use the best model to make predictions on new data
# predictions = best_model.predict(X_new)