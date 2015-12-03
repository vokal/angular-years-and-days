# angular-years-and-days

A couple Angular filters and a directive that make it easy to enter a number of days and years and get/set that as seconds or milliseconds.

The directive is designed to work with bootstrap right now. If you don't like Bootstrap you can restyle the HTML or submit a PR to make swapping the template easier :)


## Filters

### sYearsAndDays

For a number of seconds, will write out something like `1 Year 90 Days`.

### msYearsAndDays

For a number of milliseconds, will write out something like `1 Year 90 Days`.


## Directive

### yearsAndDays

Use something like so:

```html
<div data-ng-model="frequency" years-and-days data-as-seconds="true"></div>
```

`data-as-seconds` is an option if you are working with seconds, but since the JavaScript Date type is millisecond precise, that is the default if the attribute is omitted.
