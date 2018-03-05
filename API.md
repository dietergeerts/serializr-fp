# serializr-fp API documentation

[![npm](https://img.shields.io/npm/v/serializr-fp.svg?style=for-the-badge)](https://www.npmjs.com/serializr-fp)

> (De)serialize complex object graphs to/from JSON

## Constants

<dl>
<dt><a href="#SKIP">SKIP</a> : <code>symbol</code></dt>
<dd></dd>
<dt><a href="#DATE_ONLY">DATE_ONLY</a> : <code>ModelSchema.&lt;Date, string&gt;</code></dt>
<dd></dd>
<dt><a href="#DATE">DATE</a> : <code>ModelSchema.&lt;Date, string&gt;</code></dt>
<dd></dd>
<dt><a href="#PRIMITIVE">PRIMITIVE</a> : <code>ModelSchema.&lt;TYPE, TYPE&gt;</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#alias">alias(property, schema)</a> ⇒ <code>PropertySchema.&lt;OBJECT, JSON&gt;</code></dt>
<dd></dd>
<dt><a href="#array">array(schema)</a> ⇒ <code>ModelSchema.&lt;Array.&lt;OBJECT&gt;, Array.&lt;JSON&gt;&gt;</code></dt>
<dd></dd>
<dt><a href="#computed">computed(compute)</a> ⇒ <code>PropertySchema.&lt;OBJECT, JSON&gt;</code></dt>
<dd></dd>
<dt><a href="#object">object(schema)</a> ⇒ <code>ObjectModelSchema.&lt;OBJECT&gt;</code></dt>
<dd></dd>
<dt><a href="#omitBy">omitBy(predicate, schema)</a> ⇒ <code>ObjectModelSchema.&lt;OBJECT&gt;</code></dt>
<dd><p>Omit values after serialization.</p>
<p>While <code>skipBy</code> is useful to skip single values from an object, there are
situations where you want to skip all properties if they are a certain value.
In this case, it&#39;s easier to use this <code>omitBy</code> schema on the <code>object</code> schema.</p>
</dd>
<dt><a href="#omitNull">omitNull(schema)</a> ⇒ <code>ObjectModelSchema.&lt;OBJECT&gt;</code></dt>
<dd><p>Omit <code>null</code> values after serialization.</p>
</dd>
<dt><a href="#optional">optional(schema)</a> ⇒ <code>PropertySchema.&lt;OBJECT, JSON&gt;</code></dt>
<dd></dd>
<dt><a href="#skipBy">skipBy(predicate, schema)</a> ⇒ <code>PropertySchema.&lt;OBJECT, JSON&gt;</code></dt>
<dd><p>Skip the value after serialization if predicate returns true,
in case the BE doesn&#39;t want to receive certain values.</p>
<p>Some REST API&#39;s rather have the key not being there than having a certain
value they see as a nil value, like <code>null</code>, <code>&quot;&quot;</code> or <code>{}</code>. In that case, this
skip schema can be used with a predicate function to check.</p>
</dd>
<dt><a href="#skipNull">skipNull(schema)</a> ⇒ <code>PropertySchema.&lt;OBJECT, JSON&gt;</code></dt>
<dd><p>Skip <code>null</code> value after serialization.</p>
<p>Also checks undefined values, to avoid conflicts with required properties.
The required check is done as last and turns values into <code>null</code> if needed.</p>
</dd>
<dt><a href="#withDefault">withDefault(defaultValue, schema)</a> ⇒ <code>ModelSchema.&lt;OBJECT, JSON&gt;</code> | <code>PropertySchema.&lt;OBJECT, JSON&gt;</code></dt>
<dd><p>Use a default value after deserialization,
in cae the value turns up undefined.</p>
</dd>
<dt><a href="#withJsonDefault">withJsonDefault(defaultValue, schema)</a> ⇒ <code>ModelSchema.&lt;OBJECT, JSON&gt;</code> | <code>PropertySchema.&lt;OBJECT, JSON&gt;</code></dt>
<dd><p>Use a default json value before deserialization,
in case the original value is undefined.</p>
<p>This can be very handy in case a sub-object is undefined, but you want the
object to always be there, having it&#39;s properties initialized. For example,
a patient object which has a person property to hold all it&#39;s name parts. In
that case, you always want the person object to be there and have the name
parts set to null instead, so you can use it in a form to fill out.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ComputeObjectModel">ComputeObjectModel</a> ⇒ <code>OBJECT</code></dt>
<dd></dd>
<dt><a href="#ObjectModelSchema">ObjectModelSchema</a> : <code>ModelSchema.&lt;OBJECT, Object&gt;</code></dt>
<dd></dd>
<dt><a href="#ObjectSchema">ObjectSchema</a> : <code>Object.&lt;string, PropertySchema&gt;</code></dt>
<dd></dd>
<dt><a href="#PropertySchema">PropertySchema</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#PropertyTransformer">PropertyTransformer</a> ⇒ <code>TARGET</code></dt>
<dd></dd>
<dt><a href="#ModelSchema">ModelSchema</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ModelTransformer">ModelTransformer</a> ⇒ <code>TARGET</code></dt>
<dd></dd>
</dl>

<a name="SKIP"></a>

## SKIP : <code>symbol</code>
**Kind**: global constant  
<a name="DATE_ONLY"></a>

## DATE_ONLY : <code>ModelSchema.&lt;Date, string&gt;</code>
**Kind**: global constant  
<a name="DATE"></a>

## DATE : <code>ModelSchema.&lt;Date, string&gt;</code>
**Kind**: global constant  
<a name="PRIMITIVE"></a>

## PRIMITIVE : <code>ModelSchema.&lt;TYPE, TYPE&gt;</code>
**Kind**: global constant  
**Template**: TYPE  
<a name="alias"></a>

## alias(property, schema) ⇒ <code>PropertySchema.&lt;OBJECT, JSON&gt;</code>
**Kind**: global function  
**Template**: OBJECT, JSON  

| Param | Type |
| --- | --- |
| property | <code>string</code> | 
| schema | <code>ModelSchema.&lt;OBJECT, JSON&gt;</code> \| <code>PropertySchema.&lt;OBJECT, JSON&gt;</code> | 

<a name="array"></a>

## array(schema) ⇒ <code>ModelSchema.&lt;Array.&lt;OBJECT&gt;, Array.&lt;JSON&gt;&gt;</code>
**Kind**: global function  
**Template**: OBJECT, JSON  

| Param | Type |
| --- | --- |
| schema | <code>ModelSchema.&lt;OBJECT, JSON&gt;</code> | 

<a name="computed"></a>

## computed(compute) ⇒ <code>PropertySchema.&lt;OBJECT, JSON&gt;</code>
**Kind**: global function  
**Template**: OBJECT, JSON  

| Param | Type |
| --- | --- |
| compute | <code>ComputeObjectModel.&lt;OBJECT, JSON&gt;</code> | 

<a name="object"></a>

## object(schema) ⇒ <code>ObjectModelSchema.&lt;OBJECT&gt;</code>
**Kind**: global function  
**Template**: OBJECT  

| Param | Type |
| --- | --- |
| schema | [<code>ObjectSchema</code>](#ObjectSchema) | 

<a name="omitBy"></a>

## omitBy(predicate, schema) ⇒ <code>ObjectModelSchema.&lt;OBJECT&gt;</code>
Omit values after serialization.

While `skipBy` is useful to skip single values from an object, there are
situations where you want to skip all properties if they are a certain value.
In this case, it's easier to use this `omitBy` schema on the `object` schema.

**Kind**: global function  
**Template**: OBJECT  
**See**: [skipBy](#skipBy)  

| Param | Type |
| --- | --- |
| predicate | <code>function</code> | 
| schema | <code>ObjectModelSchema.&lt;OBJECT&gt;</code> | 

<a name="omitNull"></a>

## omitNull(schema) ⇒ <code>ObjectModelSchema.&lt;OBJECT&gt;</code>
Omit `null` values after serialization.

**Kind**: global function  
**Template**: OBJECT  
**See**: [omitBy](#omitBy)  

| Param | Type |
| --- | --- |
| schema | <code>ObjectModelSchema.&lt;OBJECT&gt;</code> | 

<a name="optional"></a>

## optional(schema) ⇒ <code>PropertySchema.&lt;OBJECT, JSON&gt;</code>
**Kind**: global function  
**Template**: OBJECT, JSON  

| Param | Type |
| --- | --- |
| schema | <code>ModelSchema.&lt;OBJECT, JSON&gt;</code> \| <code>PropertySchema.&lt;OBJECT, JSON&gt;</code> | 

<a name="skipBy"></a>

## skipBy(predicate, schema) ⇒ <code>PropertySchema.&lt;OBJECT, JSON&gt;</code>
Skip the value after serialization if predicate returns true,
in case the BE doesn't want to receive certain values.

Some REST API's rather have the key not being there than having a certain
value they see as a nil value, like `null`, `""` or `{}`. In that case, this
skip schema can be used with a predicate function to check.

**Kind**: global function  
**Template**: OBJECT, JSON  

| Param | Type |
| --- | --- |
| predicate | <code>function</code> | 
| schema | <code>ModelSchema.&lt;OBJECT, JSON&gt;</code> \| <code>PropertySchema.&lt;OBJECT, JSON&gt;</code> | 

<a name="skipNull"></a>

## skipNull(schema) ⇒ <code>PropertySchema.&lt;OBJECT, JSON&gt;</code>
Skip `null` value after serialization.

Also checks undefined values, to avoid conflicts with required properties.
The required check is done as last and turns values into `null` if needed.

**Kind**: global function  
**Template**: OBJECT, JSON  
**See**: [skipBy](#skipBy)  

| Param | Type |
| --- | --- |
| schema | <code>ModelSchema.&lt;OBJECT, JSON&gt;</code> \| <code>PropertySchema.&lt;OBJECT, JSON&gt;</code> | 

<a name="withDefault"></a>

## withDefault(defaultValue, schema) ⇒ <code>ModelSchema.&lt;OBJECT, JSON&gt;</code> \| <code>PropertySchema.&lt;OBJECT, JSON&gt;</code>
Use a default value after deserialization,
in cae the value turns up undefined.

**Kind**: global function  
**Template**: OBJECT, JSON  

| Param | Type |
| --- | --- |
| defaultValue | <code>OBJECT</code> | 
| schema | <code>ModelSchema.&lt;OBJECT, JSON&gt;</code> \| <code>PropertySchema.&lt;OBJECT, JSON&gt;</code> | 

<a name="withJsonDefault"></a>

## withJsonDefault(defaultValue, schema) ⇒ <code>ModelSchema.&lt;OBJECT, JSON&gt;</code> \| <code>PropertySchema.&lt;OBJECT, JSON&gt;</code>
Use a default json value before deserialization,
in case the original value is undefined.

This can be very handy in case a sub-object is undefined, but you want the
object to always be there, having it's properties initialized. For example,
a patient object which has a person property to hold all it's name parts. In
that case, you always want the person object to be there and have the name
parts set to null instead, so you can use it in a form to fill out.

**Kind**: global function  
**Template**: OBJECT, JSON  

| Param | Type |
| --- | --- |
| defaultValue | <code>JSON</code> | 
| schema | <code>ModelSchema.&lt;OBJECT, JSON&gt;</code> \| <code>PropertySchema.&lt;OBJECT, JSON&gt;</code> | 

<a name="ComputeObjectModel"></a>

## ComputeObjectModel ⇒ <code>OBJECT</code>
**Kind**: global typedef  
**Template**: OBJECT, JSON  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>Object</code> |  |
| property | <code>string</code> |  |
| {JSON) |  | value |

<a name="ObjectModelSchema"></a>

## ObjectModelSchema : <code>ModelSchema.&lt;OBJECT, Object&gt;</code>
**Kind**: global typedef  
**Template**: OBJECT  
<a name="ObjectSchema"></a>

## ObjectSchema : <code>Object.&lt;string, PropertySchema&gt;</code>
**Kind**: global typedef  
<a name="PropertySchema"></a>

## PropertySchema : <code>Object</code>
**Kind**: global typedef  
**Template**: OBJECT, JSON  
**Properties**

| Name | Type |
| --- | --- |
| [property] | <code>string</code> | 
| serialize | <code>PropertyTransformer.&lt;OBJECT, JSON&gt;</code> | 
| deserialize | <code>PropertyTransformer.&lt;JSON, OBJECT&gt;</code> | 

<a name="PropertyTransformer"></a>

## PropertyTransformer ⇒ <code>TARGET</code>
**Kind**: global typedef  
**Template**: SOURCE, TARGET  

| Param | Type |
| --- | --- |
| value | <code>SOURCE</code> | 
| source | <code>Object</code> | 
| property | <code>string</code> | 

<a name="ModelSchema"></a>

## ModelSchema : <code>Object</code>
**Kind**: global typedef  
**Template**: OBJECT, JSON  
**Properties**

| Name | Type |
| --- | --- |
| serialize | <code>ModelTransformer.&lt;OBJECT, JSON&gt;</code> | 
| deserialize | <code>ModelTransformer.&lt;JSON, OBJECT&gt;</code> | 

<a name="ModelTransformer"></a>

## ModelTransformer ⇒ <code>TARGET</code>
**Kind**: global typedef  
**Template**: SOURCE, TARGET  

| Param | Type |
| --- | --- |
| value | <code>SOURCE</code> | 

