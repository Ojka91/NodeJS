/**
 * Use module.exports to declare what can be exported
 */

'use strict'

 // Use '_' to declare a property as private (good practice)
 

var name = 'John',
    email = 'john@test.com',
    _phone = '6655458556' //private propertie

    module.exports.name = name
    module.exports.email = email