import pandas as pd
from flask import Flask, request, jsonify


app = Flask(__name__)
@app.route('/update', methods = ['POST'])
def update():
    threshold = request.json
    print(threshold)
    print (type(threshold))
    
    csv = pd.read_csv('PropData.csv',header = None, sep = ",")
    csv.columns = ['Startsum_Lowest', 'Startsum_Highest','Age_Lowest', 'Age_Highest', 'Distance', 'Start_type', 'Mare', 'Addition', 'First_Price', 'Good_Prop']

    for i in range(len(csv)) :
        if csv.loc[i, 'Applicants'] >= threshold :
            csv.loc[i, 'Good_Prop'] = 1
        else : csv.loc[i, 'Good_Prop'] = 0
    
    csv.to_csv('PropData.csv', header = False)
    return jsonify({'Antal' : threshold})

if __name__ == '__main__':
    app.run( host='localhost', port=4000)
    

 


