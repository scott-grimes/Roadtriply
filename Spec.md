get search
expects: fromloc, toloc, depttimeStr
returns: array of rides

get user
expects: id
returns: user object or false

get user/driving
expects id (of user, driving id)
returns: array of rides with passengers

get user/riding
expects id (of user, driving id)
returns:array of rides with passengers

post user
expects: username, password, email, phone
returns: user object or false

put user
expects:username, password, newpassword(optional), email (optional), phone (optional)
returns; user object or false

get ride
expects: id
returns: ride object with all passengers

delete ride:
expects: id
returns; true or false

add passenger:
expects: passengerid ride id
returns: passenger object or false

delete passenger:
expects: id
returns true/false

post passenger/add
expects: passengerid, rideid
returns passenger object or false

post passenger/remove
expects: passengerid, rideid
returns passenger object or false



get verify
expects: nothing
returns: user object if already connected

get ride
expects: id
returns: ride object or false



post login
expects: username, password
returns: user object or false

get logout
expects:nothing
returns:true/false