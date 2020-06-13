import math
from datetime import datetime
import datetime
from bson import ObjectId

from dateutil.parser import parse
from dateutil.parser import parse
from flask import Flask, render_template
from flask import request, Response
from pymongo import MongoClient
#import urllib3.parse

import json
app = Flask(__name__)

country_names = set()

county_names = set()

def _getMongo():
    return MongoClient(port=3154)

weights = {"most_recent": [0.2, 0.8],
           "importance": [0.6, 0.4]}

@app.route('/register_hosp')
def register_hospital():

    return render_template("hospital_reg.html")

@app.route('/register_donor')
def register_donor():

    return render_template("donor_reg.html")


@app.route('/hosp_info')
def hosp_info():

    data = {"name": request.args.get("name"),
    "address": request.args.get("address"),
    "contact_no": request.args.get("contact_no"),
    "contact_person" : request.args.get("contact_person"),
    "personal_email": request.args.get("person_email"),
    "instructions": request.args.get("instructions")
    }

    db = _getMongo().plasma_base

    id=db.hospitals.insert(data)

    return Response("Successfuly Registered. Here is the Hospital ID: " + str(id))


def validate_answers(answers):

    if answers["diseases"] == "yes" or answers["conceived"] == "yes":
        return False

    return True

@app.route("/search_plasma")
def search_plasma():
    bloodgroup = request.args.get("bloodgroup").upper()
    print(bloodgroup)
    db = _getMongo().plasma_base
    hospital_ids = list(db.donars.find({"blood_group": bloodgroup, "active": True}, {"hospital_id": 1}))
    print(hospital_ids)
    hospital_ids = [str(x["hospital_id"]) for x in hospital_ids]
    print(hospital_ids)
    hospitals = db.hospitals.find({})

    search_results = []
    for hospital in hospitals:
        if str(hospital["_id"]) in hospital_ids:
            hospital["id_str"] = str(hospital["_id"])
            search_results.append(hospital)
    message = "List of Hospitals"
    if len(search_results) == 0:
        message = "No hospitals found"

    return render_template("hospital_search.html",
                           hospitals=search_results,
                           bloodgroup=bloodgroup,
                           message=message)

@app.route('/select_hospital')
def select_hospital():

    donor_id = request.args.get("donor_id")
    hospital_id = request.args.get("hospital_id")

    db = _getMongo().plasma_base

    db.donars.update({"_id": ObjectId(donor_id)}, {"$set": {"hospital_id": hospital_id}}, False, True)
    return Response("Thank you for your selection, please wait for hospital to contact you for donation.")

@app.route('/request_plasma')
def request_plasma():
    hospital_id = request.args.get("hospital_id")
    blood_group = request.args.get("bloodgroup")

    return render_template("request_plasma.html",
                           hospital_id=hospital_id,
                           bloodgroup = blood_group)


@app.route('/submit_request')
def submit_request():
    data = {"name": request.args.get("name"),
            "address": request.args.get("address"),
            "contact_no": request.args.get("contact_no"),
            "hospital_id": request.args.get("hospital_id"),
            "bloodgroup": request.args.get("bloodgroup"),
            "time": datetime.datetime.now()
            }

    db = _getMongo().plasma_base

    db.plasma_requests.insert(data)

    return Response("Your request recived and stored for processing. Please wait for hospital to contact you.")


@app.route('/donor_info')
def donor_info():
    data = {"name": request.args.get("name"),
            "address": request.args.get("address"),
            "contact_no": request.args.get("contact_no"),
            "blood_group": request.args.get("blood_group"),
            "date_recovered": request.args.get("date_recovered"),
            "test_conducted": request.args.get("test_conducted"),
            "diseases": request.args.get("diseases"),
            "gender": request.args.get("gender"),
            "personal_email": request.args.get("donar_email"),
            "conceived": request.args.get("conceived"),
            "instructions": request.args.get("directions"),
            

            }
    print("Done 0")
    date_recoverd = parse(data["date_recovered"])
    time_now = datetime.datetime.now()
    
    if not validate_answers():
        return Response("Sorry, Based on your answers you can not be added as a Plasma Donor")
    print("Done 1")
    if time_now - date_recoverd >= datetime.timedelta(days=28):
        data["active"] = True
    else:
        data["active"] = False
    print("Done 2")
    db = _getMongo().plasma_base

    id = db.donars.insert(data)


    hospitals = list(db.hospitals.find({}))
    for hospital in hospitals:
        hospital["id_str"] = str(hospital["_id"])
    print("Done 3")
    return render_template("hospital_list.html", hospitals=hospitals, donor_id=str(id))

    #return Response("Here is the Hospital ID: " + str(id))

@app.route('/')
def homepage():
    return render_template("homepage.html")





if __name__ == '__main__':

    app.run(host="0.0.0.0", port=1987, threaded=True, debug=False)
