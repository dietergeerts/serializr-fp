# serializr-fp

[![npm](https://img.shields.io/npm/v/serializr-fp.svg?style=flat-square)](https://www.npmjs.com/serializr-fp)
[![codecov](https://img.shields.io/codecov/c/github/dietergeerts/serializr-fp.svg?style=flat-square)](https://codecov.io/gh/dietergeerts/serializr-fp)
[![travis](https://img.shields.io/travis/dietergeerts/serializr-fp.svg?style=flat-square)](https://travis-ci.org/dietergeerts/serializr-fp)
[![david](https://img.shields.io/david/dietergeerts/serializr-fp.svg?style=flat-square)](https://david-dm.org/dietergeerts/serializr-fp)
[![snyk](https://snyk.io/test/github/dietergeerts/serializr-fp/badge.svg?style=flat-square)](https://snyk.io/test/github/{username}/{repo})

> (De)serialize complex object graphs to/from JSON

A FP (Functional Programming) alternative to [serializr](https://github.com/mobxjs/serializr),
with a simpler approach for ease of use and better customization, configure
(de)serialization through schema's, improving readability and maintainability.

[More info about the internals and principles →](./principles.md)

## Install

```commandline
npm install serializr-fp --save
```

## Usage

```javascript
import {alias, computed, DATE_ONLY, deserialize, object, PRIMITIVE, serialize} from 'serializr-fp';

const PATIENT_SCHEMA = object({
    id: alias('_id', PRIMITIVE),
    person: object({
        firstName: PRIMITIVE, 
        lastName: PRIMITIVE,
        fullName: computed(json => `${json.firstName} ${json.lastName}`),
    }),
    dateOfBirth: alias('dob', DATE_ONLY),
});

const source = {
    id: '123',
    person: {
        firstName: 'Dieter', 
        lastName: 'Geerts', 
        fullName: 'Dieter Geerts',
    },
    dateOfBirth: new Date('1982-10-08'),
}; 

const json = PATIENT_SCHEMA.serialize(source);
const patient = PATIENT_SCHEMA.deserialize(json);

console.log(json); 
console.log(patient);

// Or you can export functions for other modules to use,
// without the need to know how (de)serialization is done.

export const deserializePatient = PATIENT_SCHEMA.deserialize;
export const serializePatient = PATIENT_SCHEMA.serialize;
```

[More useful examples →](./examples.md)

## API

[Read the API →](./API.md)

## Maintainers

[![dietergeerts](https://avatars3.githubusercontent.com/dietergeerts?v=3&s=100)](https://github.com/dietergeerts) |
:---: | 
[dietergeerts](https://github.com/dietergeerts) |

## Contribute

[![codacy](https://img.shields.io/codacy/grade/9f5cae0799824989a4f3e576c0230fa2.svg?style=flat-square&label=codacy)](https://www.codacy.com/app/dietergeerts/serializr-fp)
[![codeclimate](https://img.shields.io/codeclimate/maintainability/dietergeerts/serializr-fp.svg?style=flat-square&label=codeclimate)](https://codeclimate.com/github/dietergeerts/serializr-fp/maintainability)
[![codefactor](https://www.codefactor.io/repository/github/dietergeerts/serializr-fp/badge?style=flat-square)](https://www.codefactor.io/repository/github/dietergeerts/serializr-fp)
[![david](https://img.shields.io/david/dev/dietergeerts/serializr-fp.svg?style=flat-square)](https://david-dm.org/dietergeerts/serializr-fp)

> All contributions welcome

### Contributors

<!--START contributers-->
[<img alt="dietergeerts" src="https://avatars1.githubusercontent.com/u/7393706?v=4&s=100" width="100">](https://github.com/dietergeerts) |
:---: |
[dietergeerts](https://github.com/dietergeerts) |



<!--END contributers-->

## License

[GNU General Public License v3.0](LICENSE)
