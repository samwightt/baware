from flask import Flask, request, redirect
from twilio.twiml.messaging_response import MessagingResponse
import pymongo
from algoliasearch import algoliasearch
import time
import datetime

client = algoliasearch.Client("G3XAB62E9J", "bee79f9ef7ac1645528da7c380668294")
index = client.init_index('blobs')

myclient = pymongo.MongoClient("mongodb://127.0.0.1:3001/meteor")
mydb = myclient["meteor"]

app = Flask("name")

@app.route("/sms", methods=['GET', 'POST'])
def sms_reply():
    """Respond to incoming calls with a simple text message."""
    body = request.values.get('Body', None)
    number = request.values.get('From')

    document = mydb["conversations"].find_one({"phone": number})

    resp = MessagingResponse()
    current_date = time.mktime(datetime.datetime.now().timetuple())

    if int(document["state"]) == 1:
      if body == 'y' or body == 'Y':
        resp.message("Got it. Where are you now?")

        mydb["conversations"].update_one({
          "_id": document["_id"]
        }, {
          "$inc": {
            "state": 1
          },
          "$set": {
            "lastEdited": current_date
          }
        }, upsert=False)

      else:
        resp.message("Got it. Stay safe.")

    elif int(document["state"]) == 2:
      print(body)
      print(document)

      blob_doc = {
        "content": body,
        "lastEdited": current_date
      }

      document["blobs"].append(blob_doc)


      index.add_objects([{
        "state": document["state"],
        "blobs": document["blobs"],
        "phone": document["phone"],
        "lastEdited": document["lastEdited"],
        "objectID": document["phone"]
      }])

      mydb["conversations"].update_one({
          "_id": document["_id"]
        }, {
          "$inc": {
            "state": 1
          },
          "$set": {
            "blobs": document["blobs"],
            "lastEdited": current_date
          }
        }, upsert=False)
          
      
      resp.message("Noted. Please send any other important information.")
    
    elif int(document["state"]) >= 3:
      print(body)
      print(document)

      blob_doc = {
        "content": body,
        "lastEdited": current_date
      }
      
      document["blobs"].append(blob_doc)

      index.add_objects([{
        "state": document["state"],
        "blobs": document["blobs"],
        "phone": document["phone"],
        "lastEdited": document["lastEdited"],
        "objectID": document["phone"]
      }])

      mydb["conversations"].update_one({
          "_id": document["_id"]
        }, {
          "$inc": {
            "state": 1
          },
          "$set": {
            "blobs": document["blobs"],
            "lastEdited": current_date
          }
        }, upsert=False)
      
      resp.message("We passed it along to the operator. Feel free to send more info or leave the conversation any time.")
    
    else:
      resp.message("Operators are not looking for information from you. You will be notified in the event of an emergency.")

    return str(resp)

if __name__ == "__main__":
    app.run(debug=True)
