# -*- coding: utf-8 -*-
"""
Created on Mon Jul 26 10:56:55 2021

@author: axelh
"""

from sklearn.model_selection import train_test_split
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib
from sklearn.metrics import accuracy_score


def rfclassifier():
    # Re-train model
    col_names = ['Startsum_Lowest', 'Startsum_Highest','Age_Lowest', 'Age_Highest', 'Distance', 'Start_type', 'Mare', 'Applicants', 'Addition', 'First_Price', 'Good_Prop', 'Starting', 'Starting_Women']
    props = pd.read_csv('PropData.csv', header=None, names=col_names)
    
    props['Startsum_Highest'].astype(str).astype(float)
    props['Age_Highest'].astype(str).astype(int)
    
    #Drop Applicants
    props.drop(['Applicants'], axis=1)

    # Remove null and NaN
    #props.drop('Applicants', axis = 1, inplace = True)
    props = props.dropna()
    props.isnull().sum().sum()
    
    # Define features and target
    feature_cols = ['Startsum_Lowest', 'Startsum_Highest','Age_Lowest', 'Age_Highest', 'Distance', 'Start_type', 'Mare', 'Addition', 'First_Price']
    X = props[feature_cols] #Feature variables
    y = props.Good_Prop # The Target variable
    
    # Split train and test data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=1) # 90% training and 10% test
    
    # Construct the classifier with entropy
    classifier = RandomForestClassifier(n_estimators = 80, criterion='entropy')
    classifier = classifier.fit(X_train, y_train)
    y_pred = classifier.predict(X_test)

    # Print accuracy
    print("Accuracy:", accuracy_score(y_test, y_pred))

    joblib.dump(classifier, 'model.pkl')
    return
