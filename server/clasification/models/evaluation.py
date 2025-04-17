import numpy as np

def accuracy_score(y_true, y_pred):
    """
    Calculate the accuracy of predictions.
    Accuracy = (True Positives + True Negatives) / Total Samples
    """
    correct = np.sum(y_true == y_pred)
    total = len(y_true)
    return correct / total


def precision_score(y_test, y_pred):
    """
    Calculate the precision of predictions.
    Precision = True Positives / (True Positives + False Positives)
    """
    # Menghitung True Positives (TP) dan False Positives (FP)
    TP = 0
    FP = 0

    for i in range(len(y_test)):
        if y_pred[i] == 1:  # Jika prediksi positif
            if y_test[i] == 1:  # dan label aslinya juga positif
                TP += 1
            else:  # tetapi label aslinya negatif
                FP += 1

    # Menghindari pembagian dengan nol
    if TP + FP == 0:
        return 0
    return TP / (TP + FP)


def recall_score(y_test, y_pred):
    """
    Calculate the recall of predictions.
    Recall = True Positives / (True Positives + False Negatives)
    """
    TP = 0
    FN = 0

    for i in range(len(y_test)):
        if y_test[i] == 1:  # Jika label asli positif
            if y_pred[i] == 1:  # dan prediksi juga positif
                TP += 1
            else:  # tetapi prediksi negatif
                FN += 1

    # Menghindari pembagian dengan nol
    if TP + FN == 0:
        return 0
    return TP / (TP + FN)


def f1_score(y_test, y_pred):
    """
    Calculate the F1 score of predictions.
    F1 Score = 2 * (Precision * Recall) / (Precision + Recall)
    """
    TP = 0
    FP = 0
    FN = 0

    for i in range(len(y_test)):
        if y_pred[i] == 1:  # Jika prediksi positif
            if y_test[i] == 1:  # dan label asli positif
                TP += 1
            else:  # tetapi label asli negatif
                FP += 1
        elif y_test[i] == 1:  # jika label asli positif dan prediksi negatif
            FN += 1

    precision = TP / (TP + FP) if (TP + FP) != 0 else 0
    recall = TP / (TP + FN) if (TP + FN) != 0 else 0

    # Menghindari pembagian dengan nol untuk F1 Score
    if precision + recall == 0:
        return 0
    return 2 * (precision * recall) / (precision + recall)

