# serializr-fp API documentation

[![npm](https://img.shields.io/npm/v/serializr-fp.svg?style=for-the-badge)](https://www.npmjs.com/serializr-fp)

> (De)serialize complex object graphs to/from JSON

## Modules

<dl>
<dt><a href="#module_Core">Core</a></dt>
<dd></dd>
<dt><a href="#module_Schemas">Schemas</a></dt>
<dd></dd>
</dl>

<a name="module_Core"></a>

## Core

* [Core](#module_Core)
    * _static_
        * [.SKIP](#module_Core.SKIP) : <code>symbol</code>
        * [.serialize](#module_Core.serialize) : <code>ModelTransformer</code>
        * [.deserialize](#module_Core.deserialize) : <code>ModelTransformer</code>
    * _inner_
        * [~ModelSchema](#module_Core..ModelSchema) : <code>Object.&lt;string, !PropertySchema&gt;</code>
        * [~PropertySchema](#module_Core..PropertySchema) : <code>Object</code>
        * [~PropertyTransformer](#module_Core..PropertyTransformer) ⇒ <code>\*</code>
        * [~ModelTransformer](#module_Core..ModelTransformer) : <code>function</code> \| <code>function</code>

<a name="module_Core.SKIP"></a>

### Core.SKIP : <code>symbol</code>
**Kind**: static constant of [<code>Core</code>](#module_Core)  
<a name="module_Core.serialize"></a>

### Core.serialize : <code>ModelTransformer</code>
**Kind**: static constant of [<code>Core</code>](#module_Core)  
<a name="module_Core.deserialize"></a>

### Core.deserialize : <code>ModelTransformer</code>
**Kind**: static constant of [<code>Core</code>](#module_Core)  
<a name="module_Core..ModelSchema"></a>

### Core~ModelSchema : <code>Object.&lt;string, !PropertySchema&gt;</code>
**Kind**: inner typedef of [<code>Core</code>](#module_Core)  
<a name="module_Core..PropertySchema"></a>

### Core~PropertySchema : <code>Object</code>
**Kind**: inner typedef of [<code>Core</code>](#module_Core)  
**Properties**

| Name | Type |
| --- | --- |
| [property] | <code>string</code> | 
| serialize | <code>PropertyTransformer</code> | 
| deserialize | <code>PropertyTransformer</code> | 

<a name="module_Core..PropertyTransformer"></a>

### Core~PropertyTransformer ⇒ <code>\*</code>
**Kind**: inner typedef of [<code>Core</code>](#module_Core)  

| Param | Type |
| --- | --- |
| value | <code>\*</code> | 
| [source] | <code>Object</code> | 
| [property] | <code>string</code> | 

<a name="module_Core..ModelTransformer"></a>

### Core~ModelTransformer : <code>function</code> \| <code>function</code>
**Kind**: inner typedef of [<code>Core</code>](#module_Core)  
<a name="module_Schemas"></a>

## Schemas

* [Schemas](#module_Schemas)
    * [.PRIMITIVE](#module_Schemas.PRIMITIVE) : <code>PropertySchema</code>
    * [.DATE](#module_Schemas.DATE) : <code>PropertySchema</code>
    * [.DATE_ONLY](#module_Schemas.DATE_ONLY) : <code>PropertySchema</code>
    * [.object(schema)](#module_Schemas.object) ⇒ <code>PropertySchema</code>
    * [.array(schema)](#module_Schemas.array) ⇒ <code>PropertySchema</code>
    * [.alias(property, schema)](#module_Schemas.alias) ⇒ <code>PropertySchema</code>
    * [.optional(schema)](#module_Schemas.optional) ⇒ <code>PropertySchema</code>
    * [.computed(compute)](#module_Schemas.computed) ⇒ <code>PropertySchema</code>
    * [.withDefault(value, schema)](#module_Schemas.withDefault) ⇒ <code>PropertySchema</code>
    * [.withJsonDefault(value, schema)](#module_Schemas.withJsonDefault) ⇒ <code>PropertySchema</code>

<a name="module_Schemas.PRIMITIVE"></a>

### Schemas.PRIMITIVE : <code>PropertySchema</code>
**Kind**: static constant of [<code>Schemas</code>](#module_Schemas)  
<a name="module_Schemas.DATE"></a>

### Schemas.DATE : <code>PropertySchema</code>
**Kind**: static constant of [<code>Schemas</code>](#module_Schemas)  
<a name="module_Schemas.DATE_ONLY"></a>

### Schemas.DATE_ONLY : <code>PropertySchema</code>
**Kind**: static constant of [<code>Schemas</code>](#module_Schemas)  
<a name="module_Schemas.object"></a>

### Schemas.object(schema) ⇒ <code>PropertySchema</code>
**Kind**: static method of [<code>Schemas</code>](#module_Schemas)  

| Param | Type |
| --- | --- |
| schema | <code>ModelSchema</code> | 

<a name="module_Schemas.array"></a>

### Schemas.array(schema) ⇒ <code>PropertySchema</code>
**Kind**: static method of [<code>Schemas</code>](#module_Schemas)  

| Param | Type |
| --- | --- |
| schema | <code>PropertySchema</code> | 

<a name="module_Schemas.alias"></a>

### Schemas.alias(property, schema) ⇒ <code>PropertySchema</code>
**Kind**: static method of [<code>Schemas</code>](#module_Schemas)  

| Param | Type |
| --- | --- |
| property | <code>string</code> | 
| schema | <code>PropertySchema</code> | 

<a name="module_Schemas.optional"></a>

### Schemas.optional(schema) ⇒ <code>PropertySchema</code>
**Kind**: static method of [<code>Schemas</code>](#module_Schemas)  

| Param | Type |
| --- | --- |
| schema | <code>PropertySchema</code> | 

<a name="module_Schemas.computed"></a>

### Schemas.computed(compute) ⇒ <code>PropertySchema</code>
**Kind**: static method of [<code>Schemas</code>](#module_Schemas)  

| Param | Type |
| --- | --- |
| compute | <code>function</code> | 

<a name="module_Schemas.withDefault"></a>

### Schemas.withDefault(value, schema) ⇒ <code>PropertySchema</code>
**Kind**: static method of [<code>Schemas</code>](#module_Schemas)  

| Param | Type |
| --- | --- |
| value | <code>\*</code> | 
| schema | <code>PropertySchema</code> | 

<a name="module_Schemas.withJsonDefault"></a>

### Schemas.withJsonDefault(value, schema) ⇒ <code>PropertySchema</code>
Use a default json value before deserialization,
in case the original value is undefined.

This can be very handy in case a sub-object is undefined, but you want the
object to always be there, having it's properties initialized. For example,
a patient object which has a person property to hold all it's name parts. In
that case, you always want the person object to be there and have the name
parts set to null instead, so you can use it in a form to fill out.

**Kind**: static method of [<code>Schemas</code>](#module_Schemas)  

| Param | Type |
| --- | --- |
| value | <code>\*</code> | 
| schema | <code>PropertySchema</code> | 

