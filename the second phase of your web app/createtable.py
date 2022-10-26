class Comments(db.Model):
    _tablename_ = "visitorinfo"
#Basic information
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(30), nullable=True)
    email = db.Column(db.string(30), nullable=True)
    dob = db.Column(db.date(30), nullable=True)
    placeofbirth = db.Column(db.String(30), nullable=True)

#More about you
    degree = db.Column(db.String(30), nullable=True)
    workex = db.Column(db.String(30), nullable=True)
    familyinfo = db.Column(db.String(30), nullable=True)
    hobbies = db.Column(db.String(30), nullable=True)
    futureplan = db.Column(db.String(30), nullable=True)