# serializr-fp API documentation

[![npm](https://img.shields.io/npm/v/serializr-fp.svg?style=for-the-badge)](https://www.npmjs.com/serializr-fp)

> (De)serialize complex object graphs to/from JSON

## Modules

<dl>
<dt><a href="#module_serializrFp/core">serializrFp/core</a></dt>
<dd></dd>
<dt><a href="#module_serializrFp/schemas">serializrFp/schemas</a></dt>
<dd></dd>
</dl>

<a name="module_serializrFp/core"></a>

## serializrFp/core

* [serializrFp/core](#module_serializrFp/core)
    * _static_
        * [.SKIP](#module_serializrFp/core.SKIP) : <code>symbol</code>
        * [.serialize](#module_serializrFp/core.serialize) : <code>ModelTransformer</code>
        * [.deserialize](#module_serializrFp/core.deserialize) : <code>ModelTransformer</code>
    * _inner_
        * [~ModelSchema](#module_serializrFp/core..ModelSchema) : <code>Object.&lt;string, !PropertySchema&gt;</code>
        * [~PropertySchema](#module_serializrFp/core..PropertySchema) : <code>Object</code>
        * [~PropertyTransformer](#module_serializrFp/core..PropertyTransformer) ⇒ <code>\*</code>
        * [~ModelTransformer](#module_serializrFp/core..ModelTransformer) : <code>function</code> \| <code>function</code>

<a name="module_serializrFp/core.SKIP"></a>

### serializrFp/core.SKIP : <code>symbol</code>
**Kind**: static constant of [<code>serializrFp/core</code>](#module_serializrFp/core)  
<a name="module_serializrFp/core.serialize"></a>

### serializrFp/core.serialize : <code>ModelTransformer</code>
**Kind**: static constant of [<code>serializrFp/core</code>](#module_serializrFp/core)  
<a name="module_serializrFp/core.deserialize"></a>

### serializrFp/core.deserialize : <code>ModelTransformer</code>
**Kind**: static constant of [<code>serializrFp/core</code>](#module_serializrFp/core)  
<a name="module_serializrFp/core..ModelSchema"></a>

### serializrFp/core~ModelSchema : <code>Object.&lt;string, !PropertySchema&gt;</code>
**Kind**: inner typedef of [<code>serializrFp/core</code>](#module_serializrFp/core)  
<a name="module_serializrFp/core..PropertySchema"></a>

### serializrFp/core~PropertySchema : <code>Object</code>
**Kind**: inner typedef of [<code>serializrFp/core</code>](#module_serializrFp/core)  
**Properties**

| Name | Type |
| --- | --- |
| [property] | <code>string</code> | 
| serialize | <code>PropertyTransformer</code> | 
| deserialize | <code>PropertyTransformer</code> | 

<a name="module_serializrFp/core..PropertyTransformer"></a>

### serializrFp/core~PropertyTransformer ⇒ <code>\*</code>
**Kind**: inner typedef of [<code>serializrFp/core</code>](#module_serializrFp/core)  

| Param | Type |
| --- | --- |
| value | <code>\*</code> | 
| [source] | <code>Object</code> | 
| [property] | <code>string</code> | 

<a name="module_serializrFp/core..ModelTransformer"></a>

### serializrFp/core~ModelTransformer : <code>function</code> \| <code>function</code>
**Kind**: inner typedef of [<code>serializrFp/core</code>](#module_serializrFp/core)  
<a name="module_serializrFp/schemas"></a>

## serializrFp/schemas

* [serializrFp/schemas](#module_serializrFp/schemas)
    * [.PRIMITIVE](#module_serializrFp/schemas.PRIMITIVE) : <code>PropertySchema</code>
    * [.DATE](#module_serializrFp/schemas.DATE) : <code>PropertySchema</code>
    * [.DATE_ONLY](#module_serializrFp/schemas.DATE_ONLY) : <code>PropertySchema</code>
    * [.object(schema)](#module_serializrFp/schemas.object) ⇒ <code>PropertySchema</code>
    * [.array(schema)](#module_serializrFp/schemas.array) ⇒ <code>PropertySchema</code>
    * [.alias(property, schema)](#module_serializrFp/schemas.alias) ⇒ <code>PropertySchema</code>
    * [.optional(schema)](#module_serializrFp/schemas.optional) ⇒ <code>PropertySchema</code>
    * [.computed(compute)](#module_serializrFp/schemas.computed) ⇒ <code>PropertySchema</code>
    * [.withDefault(value, schema)](#module_serializrFp/schemas.withDefault) ⇒ <code>PropertySchema</code>
    * [.withJsonDefault(value, schema)](#module_serializrFp/schemas.withJsonDefault) ⇒ <code>PropertySchema</code>
    * [.skipBy(predicate, schema)](#module_serializrFp/schemas.skipBy) ⇒ <code>PropertySchema</code>
    * [.skipNull(schema)](#module_serializrFp/schemas.skipNull) ⇒ <code>PropertySchema</code>
    * [.omitBy(predicate, schema)](#module_serializrFp/schemas.omitBy) ⇒ <code>PropertySchema</code>
    * [.omitNull(schema)](#module_serializrFp/schemas.omitNull) ⇒ <code>PropertySchema</code>

<a name="module_serializrFp/schemas.PRIMITIVE"></a>

### serializrFp/schemas.PRIMITIVE : <code>PropertySchema</code>
**Kind**: static constant of [<code>serializrFp/schemas</code>](#module_serializrFp/schemas)  
<a name="module_serializrFp/schemas.DATE"></a>

### serializrFp/schemas.DATE : <code>PropertySchema</code>
**Kind**: static constant of [<code>serializrFp/schemas</code>](#module_serializrFp/schemas)  
<a name="module_serializrFp/schemas.DATE_ONLY"></a>

### serializrFp/schemas.DATE_ONLY : <code>PropertySchema</code>
**Kind**: static constant of [<code>serializrFp/schemas</code>](#module_serializrFp/schemas)  
<a name="module_serializrFp/schemas.object"></a>

### serializrFp/schemas.object(schema) ⇒ <code>PropertySchema</code>
**Kind**: static method of [<code>serializrFp/schemas</code>](#module_serializrFp/schemas)  

| Param | Type |
| --- | --- |
| schema | <code>ModelSchema</code> | 

<a name="module_serializrFp/schemas.array"></a>

### serializrFp/schemas.array(schema) ⇒ <code>PropertySchema</code>
**Kind**: static method of [<code>serializrFp/schemas</code>](#module_serializrFp/schemas)  

| Param | Type |
| --- | --- |
| schema | <code>PropertySchema</code> | 

<a name="module_serializrFp/schemas.alias"></a>

### serializrFp/schemas.alias(property, schema) ⇒ <code>PropertySchema</code>
**Kind**: static method of [<code>serializrFp/schemas</code>](#module_serializrFp/schemas)  

| Param | Type |
| --- | --- |
| property | <code>string</code> | 
| schema | <code>PropertySchema</code> | 

<a name="module_serializrFp/schemas.optional"></a>

### serializrFp/schemas.optional(schema) ⇒ <code>PropertySchema</code>
**Kind**: static method of [<code>serializrFp/schemas</code>](#module_serializrFp/schemas)  

| Param | Type |
| --- | --- |
| schema | <code>PropertySchema</code> | 

<a name="module_serializrFp/schemas.computed"></a>

### serializrFp/schemas.computed(compute) ⇒ <code>PropertySchema</code>
**Kind**: static method of [<code>serializrFp/schemas</code>](#module_serializrFp/schemas)  

| Param | Type |
| --- | --- |
| compute | <code>function</code> | 

<a name="module_serializrFp/schemas.withDefault"></a>

### serializrFp/schemas.withDefault(value, schema) ⇒ <code>PropertySchema</code>
Use a default value after deserialization,
in cae the value turns up undefined.

**Kind**: static method of [<code>serializrFp/schemas</code>](#module_serializrFp/schemas)  

| Param | Type |
| --- | --- |
| value | <code>\*</code> | 
| schema | <code>PropertySchema</code> | 

<a name="module_serializrFp/schemas.withJsonDefault"></a>

### serializrFp/schemas.withJsonDefault(value, schema) ⇒ <code>PropertySchema</code>
Use a default json value before deserialization,
in case the original value is undefined.

This can be very handy in case a sub-object is undefined, but you want the
object to always be there, having it's properties initialized. For example,
a patient object which has a person property to hold all it's name parts. In
that case, you always want the person object to be there and have the name
parts set to null instead, so you can use it in a form to fill out.

**Kind**: static method of [<code>serializrFp/schemas</code>](#module_serializrFp/schemas)  

| Param | Type |
| --- | --- |
| value | <code>\*</code> | 
| schema | <code>PropertySchema</code> | 

<a name="module_serializrFp/schemas.skipBy"></a>

### serializrFp/schemas.skipBy(predicate, schema) ⇒ <code>PropertySchema</code>
Skip the value after serialization if predicate returns true,
in case the BE doesn't want to receive certain values.

Some REST API's rather have the key not being there than having a certain
value they see as a nil value, like `null`, `""` or `{}`. In that case, this
skip schema can be used with a predicate function to check.

**Kind**: static method of [<code>serializrFp/schemas</code>](#module_serializrFp/schemas)  

| Param | Type |
| --- | --- |
| predicate | <code>function</code> | 
| schema | <code>PropertySchema</code> | 

<a name="module_serializrFp/schemas.skipNull"></a>

### serializrFp/schemas.skipNull(schema) ⇒ <code>PropertySchema</code>
Skip `null` value after serialization.

**Kind**: static method of [<code>serializrFp/schemas</code>](#module_serializrFp/schemas)  
**See**: [skipBy](skipBy)  

| Param | Type |
| --- | --- |
| schema | <code>PropertySchema</code> | 

<a name="module_serializrFp/schemas.omitBy"></a>

### serializrFp/schemas.omitBy(predicate, schema) ⇒ <code>PropertySchema</code>
Omit values after serialization.

**Kind**: static method of [<code>serializrFp/schemas</code>](#module_serializrFp/schemas)  
**See**: [skipBy](skipBy)  

| Param | Type |
| --- | --- |
| predicate | <code>function</code> | 
| schema | <code>PropertySchema</code> | 

<a name="module_serializrFp/schemas.omitNull"></a>

### serializrFp/schemas.omitNull(schema) ⇒ <code>PropertySchema</code>
Omit `null` values after serialization.

**Kind**: static method of [<code>serializrFp/schemas</code>](#module_serializrFp/schemas)  
**See**: [omitBy](omitBy)  

| Param | Type |
| --- | --- |
| schema | <code>PropertySchema</code> | 

