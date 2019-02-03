# Texts a phone number given the following syntax.
# python text.py 2564839583
# Use argc/argv to accept in phone number input via command line.
# Texts the user an initial emergency message asking them if they are alright.
from twilio.rest import Client
import sys
import pymongo
import time
import datetime

myclient = pymongo.MongoClient("mongodb://127.0.0.1:3001/meteor")
mydb = myclient["meteor"]


account_sid = "AC9aade586244cdaf0f60937cca0ec2bbd"
auth_token = "ae1195e03c556aa64768c67f04468ed6"

client = Client(account_sid, auth_token)
for x in range(1, len(sys.argv)):
  current_date = time.mktime(datetime.datetime.now().timetuple())
  mydict = { "state": 1, "blobs": [], "phone": sys.argv[x], "lastEdited": current_date}
  mydb["conversations"].insert_one(mydict)

  message = client.messages \
    .create(
      body="URGENT MESSAGE FROM BAWARE: There has been an emergency. Do you need assistance? (Y/N)",
      from_="+12052256935",
      to= sys.argv[x]
      )
