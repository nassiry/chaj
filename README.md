# chaj

![npm version](https://img.shields.io/npm/v/chajdate.svg)
![Total Downloads](https://img.shields.io/npm/dt/chajdate.svg)
![License](https://img.shields.io/npm/l/chajdate.svg)

### Is modern browser fast and small with zero dependency ***native JavaScript*** datetime converting and formatting from Shamsi/Jalali/Persian to [Gregory](https://en.wikipedia.org/wiki/Gregorian_calendar) and vice versa.
The API using modern browser [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) object for date and time formatting.


### تبدیل و تغیر تاریخ هجری شمسی/جلالی به میلادی و برعکس آن برای بروزر های جدید و Nodejs

Quick Info:

> Shamsi/Jalali/Persian or [Solar Hijri Calendar](https://en.wikipedia.org/wiki/Solar_Hijri_calendar) currently using in Afghanistan, Iran and Tajikistan you can find more info [Here](https://en.wikipedia.org/wiki/Solar_Hijri_calendar) 
> the API converting and formatting datetime to [gregory](https://en.wikipedia.org/wiki/Gregorian_calendar) and vice versa.

## Getting Started

### Installation - فعالسازی
in Browser: در بروزر

You can [Download](https://github.com/nassiry/chaj/releases/latest) and link to file.

```html
<script src="path/to/chaj.js"></script>
```
### Via npm package manager در Nodejs
```shell
npm install chajdate

```
### Usage: - استفاده
- Currently, there is only one public method:
`
  Chaj.format()
  `


The method taking tow paramters date as `string` in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format, and second param as `object` with all available and valid properties of [Intl.DateTimeFormat - Options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#parameters) and return converted/formatted date as `string/array`

### Example: مثالها
By default `Chaj.format()` with zero param return current local date & time.


```javascript


const Chaj = require('chajdate');

// with no parameters.
Chaj.format() // current date 0000/00/00


// convert/format gregory to shamsi/jalali/persian
Chaj.format('2022-10-25') // 1401/8/3

// convert/format shamsi/jalali/persian to gregory
Chaj.format('1401-8-25', {shamsi: true}) // 11/16/2022

// Customize the date by adding more options
Chaj.format(null, {dateStyle: 'full'}) // current date

Chaj.format('2022-10-25', {dateStyle: 'full'}) // 1401 عقرب 3, سه‌شنبه

Chaj.format('1401-10-02', {shamsi: true, dateStyle: 'full'}) // Friday, December 23, 2022

```


### Parameters/Options

- First Param Date as `string` in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format a space instead of the "T" is allowed.
  ```javascript 
  Chaj.format('2022-10-25T12:00:00.000Z')` - `Chaj.format('2022-10-25 14:25')
  ```
- Second Param as `object {}` you can pass all [Intl.DateTimeFormat - Options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#parameters) at once.
  ```javascript
  Chaj.format('2022-10-25', {
    dateStyle: 'full',
    locale: 'en-US',
    timeZone: 'Asia/Kabul', 
    calendar: 'persian'}
    )
  ```
 - Converting shamsi/jalali/persian date to gregory add `shamsi` as `boolean` ***default is `false`***.
    ```javascript
    Chaj.format('1401-8-25', {
      shamsi: true, 
      dateStyle: 'full', 
      locale: 'en-US', 
      timeZone: 'Asia/Kabul', 
      calendar: 'persian'}
      )
    ```
 
 - By default it converting/formatting date with local datetime. you can add `utc` key to option with `boolean` value ***default is false*** for converting/formatting date and time to [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time).
    ```javascript
    Chaj.format('1401-8-25', {
      shamsi: true,
      utc: true,
      dateStyle: 'full',
      locale: 'en-US',
      timeZone: 'Asia/Kabul',
      calendar: 'persian'}
      )
    ```


### Return value.
By default it return as `string` you can add `toArray` as `boolean` for returning value as array of objects.

### Default Paramters/Options:
- Date as `string` current local date & time.
- Options as `object` 
  ```javascript
  timeZone: 'Asia/Kabul',
  calendar: 'persian',
  locale: 'fa-AF-u-nu-latn',
  utc: false,
  shamsi: false,
  toArray: false
  ```


### More Options:
you can find more formatting information about `Intl.DateTimeFormat - Options` , Thanks to MDN documentation [Here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#parameters)

**Browser/Nodejs Support**

Chrome | Firefox | Safari | Opera | Edge | Nodejs
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔

TODO:
add more public methods.


### License

[MIT](LICENSE)


