from flask import Blueprint, request, abort
from flaskr.services import roleService
bp = Blueprint('roleController', __name__)

@bp.route('/roles')
def getRoles():
    return roleService.getRoles()

@bp.route('/roles/<int:id>')
def getRole(id):
    return roleService.getRole(id)

@bp.route('/roles', methods=['POST'])
def createRole():
    teamData = request.json
    if(not teamData):
        abort(400)
    return roleService.createRole(teamData)
    
@bp.route('/roles/<int:id>', methods=['PATCH'])
def updateRole(id):
    teamData = request.json
    if(not teamData):
        abort(400)
    return roleService.updateRole(id, teamData)

@bp.route('/roles/<int:id>', methods=['DELETE'])
def deleteRole(id):
    return roleService.deleteRole(id)