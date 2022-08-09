from . import db

# TeamRoles = db.Table(
#     'teamroles',
#     db.Column('teamId', db.Integer, db.ForeignKey('teams.id'), primary_key=True),
#     db.Column('roleId', db.Integer, db.ForeignKey('roles.id'), primary_key=True)
# )

class Team(db.Model):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    # roles = db.relationship('Role', secondary=TeamRoles)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    roles = db.relationship("Role")

    def __init__(self, name):
        self.name = name

    def toJson(self):
        return {
            'id': self.id,
            'name': self.name,
            'role': self.roles.toJson() if self.roles is not None else None
        }

class Role(db.Model):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    parentTeams = db.relationship("Team", back_populates="roles")

    def __init__(self, name):
        self.name = name

    def toJson(self):
        return {
            'id': self.id,
            'name': self.name
        }

