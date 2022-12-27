/**
 * Chaj - v0.1
 * @author A.S Nasseri
 * @license The MIT License (MIT)
 * @copyright Copyright (c) 2022 A.S Nasseri
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * */

;(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (factory((global.Chaj = global.Chaj || {})));
}(this, (function (exports) { 'use strict';

    // Constants
    const _DATE = new Date(),

        // Default configuration
        _DEFAULT_LOCAL_CONFIG = {
            timeZone: 'Asia/Kabul',
            calendar: 'persian',
        },

        // Global configuration.
        // If no config provided during converting shamsi date we need to use global config.
        _DEFAULT_GLOBAL_CONFIG = {
            timeZone: 'UTC',
            calendar: 'iso8601',
            locale: 'an-US'
        },

        // Helper config
        _EXTRA_CONFIG = {
            locale: 'fa-AF-u-nu-latn',
            utc: false,
            shamsi: false,
            toArray: false
        },

    /**
     * Private function Parse Date, in ISO format only.
     * @param {object} input - {date, utc, shamsi} (date) as string in ISO format for converting
     * and formatting, (utc) as boolean date to UTC. by default the function parse date to local date.
     * (shamsi) as boolean convert shamsi/jalali.
     * @return {Date<Object>}
     * */
     _parseDate = input => {
        const { date, utc, shamsi } = input;
        if (date === null) return new Date(NaN)
        if (typeof date === undefined) return new Date()
        if (date instanceof Date) return new Date(date)
        if (typeof date === 'string' && !/Z$/i.test(date)) {
            const _date = date.match(/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/);
            if (_date) {
                let year, month, day;
                if (shamsi) {
                    // convert string to number for calculation
                    let sYear = Number(_date[1]),
                        sMon = Number(_date[2]),
                        sDay = Number(_date[3]);

                    let yArray, gYear, gMon, gDay, tDays;
                    sYear += 1595;
                    tDays = -355668 + (365 * sYear) + (~~(sYear / 33) * 8) + ~~(((sYear % 33) + 3) / 4) + sDay + ((sMon < 7) ? (sMon - 1) * 31 : ((sMon - 7) * 30) + 186);
                    gYear = 400 * ~~(tDays / 146097);
                    tDays %= 146097;
                    if (tDays > 36524) {
                        gYear += 100 * ~~(--tDays / 36524);
                        tDays %= 36524;
                        if (tDays >= 365) tDays++;
                    }
                    gYear += 4 * ~~(tDays / 1461);
                    tDays %= 1461;
                    if (tDays > 365) {
                        gYear += ~~((tDays - 1) / 365);
                        tDays = (tDays - 1) % 365;
                    }
                    gDay = tDays + 1;
                    yArray = [0, 31, ((gYear % 4 === 0 && gYear % 100 !== 0) || (gYear % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    for (gMon = 0; gMon < 13 && gDay > yArray[gMon]; gMon++) gDay -= yArray[gMon];
                    year = gYear;
                    month = (gMon - 1);
                    day = (gDay + 1) || 0;
                } else {
                    year = _date[1];
                    month = (_date[2] - 1);
                    day = _date[3] || 0
                }
                const ms = (_date[7] || '0').substring(0, 3);

                if (utc) return new Date(Date.UTC(year, month, day
                        || 1, _date[4] || 0, _date[5] || 0, _date[6] || 0, ms))

                return new Date(year, month, day
                    || 1, _date[4] || 0, _date[5] || 0, _date[6] || 0, ms)
            }
        }

        return new Date(date);
    };

    /**
     * Public API
     * The method will convert/format date.
     * @param {string} date - if date not provided by default it will return today local date and time.
     * @param {Object} config - An object with some or all of the (Intl.DateTimeFormat) option properties
     * @return {string} formatted/converted date
     * */
     exports.format = (date, config) => {

        const _config = {
            ..._DEFAULT_LOCAL_CONFIG,
            ..._EXTRA_CONFIG,
            ...typeof config === 'object' ? config : {}
        };

        // In case of converting shamsi/jalali date with zero config
        // use global config.
        if (_config.shamsi) {
            _config.timeZone = config.timeZone ??= _DEFAULT_GLOBAL_CONFIG.timeZone;
            _config.calendar = config.calendar ??= _DEFAULT_GLOBAL_CONFIG.calendar;
            _config.locale = config.locale ??= _DEFAULT_GLOBAL_CONFIG.locale;
        }

        // cache extra config for later usage.
        const {
            locale,
            utc,
            shamsi,
            toArray
        } = _config;

        // we don't need to hard code custom properties to Intl date formatting options
        // make the config clear for date formatting.
        // delete custom properties from config we don't need it any more.
        // TODO: remove adding/checking custom properties.
        Object.keys(_EXTRA_CONFIG).forEach(prop => {
            if (_config.hasOwnProperty(prop)) delete _config[prop];
        });

         // Parse/convert date
         const dateObj = _parseDate({
             date: date ? date : _DATE, // If date not provided,
             utc: utc,
             shamsi: shamsi
         });

         const _formatter = Intl.DateTimeFormat(
            locale,
            _config
        );

         try {
            if (dateObj) return (toArray) ? _formatter.formatToParts(dateObj) : _formatter.format(dateObj);
         } catch (e) {
             console.error('An error occurred:', e.message);
         }
    };
})));