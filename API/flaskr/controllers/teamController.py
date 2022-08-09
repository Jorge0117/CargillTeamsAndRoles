from flask import Blueprint, request, abort
from flaskr.services import teamService
bp = Blueprint('teamController', __name__)

@bp.route('/teams')
def getTeams():
    return teamService.getTeams()

@bp.route('/teams/<int:id>')
def getTeam(id):
    return teamService.getTeam(id)

@bp.route('/teams', methods=['POST'])
def createTeam():
    teamData = request.json
    if(not teamData):
        abort(400)
    return teamService.createTeam(teamData)

@bp.route('/teams/<int:id>', methods=['PATCH'])
def updateTeam(id):
    teamData = request.json
    if(not teamData):
        abort(400)
    return teamService.updateTeam(id, teamData)

@bp.route('/teams/<int:id>', methods=['DELETE'])
def deleteTeam(id):
    return teamService.deleteTeam(id)