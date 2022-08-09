from flaskr import db
from flask import jsonify, abort
from ..models import Team, Role

def getTeams():
    teams = Team.query.all()
    return jsonify([team.toJson() for team in teams])

def getTeam(id):
    team = Team.query.get(id)
    if(team is None):
        abort(404)
    return jsonify(team.toJson())

def createTeam(body):
    team = Team(body['name'])
    if('role' in body and body['role'] is not None):
        role = Role.query.get(body['role']['id'])
        team.roles = role
    db.session.add(team)
    db.session.commit()
    return jsonify(team.toJson())

def updateTeam(id, body):
    team = Team.query.get(id)
    if(team is None):
        abort(404)
    if('name' in body):
        team.name = body['name']
    if('role' in body and body['role'] is not None):
        role = Role.query.get(body['role']['id'])
        team.roles = role
    db.session.commit()
    return jsonify(team.toJson())

def deleteTeam(id):
    team = Team.query.get(id)
    if(team is None):
        abort(404)
    db.session.delete(team)
    db.session.commit()
    return jsonify({'deleted': True})
