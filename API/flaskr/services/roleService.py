from flaskr import db
from flask import jsonify, abort
from ..models import Role

def getRoles():
    roles = Role.query.all()
    return jsonify([role.toJson() for role in roles])

def getRole(id):
    role = Role.query.get(id)
    if(role is None):
        abort(404)
    return jsonify(role.toJson())

def createRole(body):
    role = Role(body['name'])
    db.session.add(role)
    db.session.commit()
    return jsonify(role.toJson())

def updateRole(id, body):
    role = Role.query.get(id)
    if(role is None):
        abort(404)
    role.name = body['name']
    db.session.commit()
    return jsonify(role.toJson())

def deleteRole(id):
    role = Role.query.get(id)
    if(role is None):
        abort(404)
    teamsWithRole = role.parentTeams
    for team in teamsWithRole:
        team.roles = None
    db.session.add_all(teamsWithRole)
    db.session.delete(role)
    db.session.commit()
    return jsonify({'deleted': True})
