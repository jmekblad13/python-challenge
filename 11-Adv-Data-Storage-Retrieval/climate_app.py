import datetime as dt
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, and_

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Measurements = Base.classes.measurements
Stations = Base.classes.stations

# Create our session (link) from Python to the DB
session = Session(engine)

app = Flask(__name__)

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/<start><br/>"
        f"/api/v1.0/<start>/<end>"
    )


@app.route("/api/v1.0/precipitation")
def precipitation():
    """Return a list of precipitation totals"""
    # Query all passengers
    
    results = session.query(Measurements.date, func.sum(Measurements.prcp)).\
    filter(and_(Measurements.date > '2017-04-17',Measurements.prcp !=None)).\
    order_by(Measurements.date).group_by(Measurements.date).all()

    all_prcp = []
    for observation in results:
        observation_dict = {}
        observation_dict["date"] = observation.date
        observation_dict["total"] = observation[1]
        
        all_prcp.append(observation_dict)

    return jsonify(all_prcp)


@app.route("/api/v1.0/stations")
def passengers():
    """Return a list of the stations"""

    results = session.query(Measurements.station).group_by(Measurements.station).\
    order_by(func.count(Measurements.station).desc()).all()

    all_stations = list(np.ravel(results))

    return jsonify(all_stations)

@app.route("/api/v1.0/tobs")
def tobs():
    """Return a list of the temperature observations at the station with the most observations in the past year"""

    results = session.query(Measurements.tobs).\
    filter(and_(Measurements.date > '2017-04-17',Measurements.station=='USC00519397')).all()

    return jsonify(results)

@app.route("/api/v1.0/<start>")
def greater_calc_temps(start):
    sel = [func.min(Measurements.tobs), func.avg(Measurements.tobs), func.max(Measurements.tobs)]
    temp_averages = session.query(*sel).\
        filter(Measurements.date >= start).all()

    return jsonify(temp_averages)


@app.route("/api/v1.0/<start>/<end>")
def calc_temps(start,end):
    sel = [func.min(Measurements.tobs), func.avg(Measurements.tobs), func.max(Measurements.tobs)]
    range_averages = session.query(*sel).\
        filter(and_(Measurements.date >= start,Measurements.date <= end)).all()

    return jsonify(range_averages)


if __name__ == '__main__':
    app.run(debug=True)