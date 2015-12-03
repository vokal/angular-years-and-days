"use strict";

var getYears = function ( date )
{
    return date.getUTCFullYear() - 1970;
};

var getDays = function ( date )
{
    var d = new Date( date.getTime() );
    var now = d.getTime();
    d.setUTCMonth( 0 );
    d.setUTCDate( 1 );
    return Math.round( ( now - d.getTime() ) / 3600 / 24 / 1000 );
};

angular.module( "yearsAndDays", [] )
    .filter( "sYearsAndDays", [ "$filter", function ( $filter )
    {
        return function ( seconds )
        {
            return $filter( "msYearsAndDays" )( seconds * 1000 );
        };
    } ] )
    .filter( "msYearsAndDays", [ function ()
    {
        return function ( ms )
        {
            var date = new Date( Number( ms ) );
            if( date.toString() === "Invalid Date" )
            {
                return ms;
            }

            var years = getYears( date );
            var days = getDays( date );

            return ( years > 0 ? years + " Year" + ( years > 1 ? "s" : "" ) + " " : "" )
                + ( days > 0 ? days + " Day" + ( days > 1 ? "s" : "" ) : "" );
        };
    } ] )
    .directive( "yearsAndDays", [ "$compile",
        function ( $compile )
        {
            var template = '<div class="input-group">'
                + '  <input type="text" class="form-control" data-ng-model="years">'
                + '  <span class="input-group-addon">Years</span>'
                + '</div><div class="input-group">'
                + '  <input type="text" class="form-control" data-ng-model="days">'
                + '  <span class="input-group-addon">Days</span>'
                + "</div>";

            return {
                require: "ngModel",
                scope: {
                    years: "=years",
                    days: "=days",
                    asSeconds: "=asSeconds"
                },
                link: function ( scope, element, attrs, ngModel )
                {
                    var render = function ()
                    {
                        element.html( template );
                        $compile( element.contents() )( scope );
                    };

                    var updateTiming = function ()
                    {
                        var timing = Date.UTC( 1970 + Number( scope.years ), 0, Number( scope.days ) + 1 )
                            / ( scope.asSeconds ? 1000 : 1 );
                        ngModel.$setViewValue( timing > 0 ? timing : undefined );
                    };

                    scope.$watch( "years", updateTiming );
                    scope.$watch( "days", updateTiming );

                    ngModel.$render = function ()
                    {
                        var date = new Date( Number( ngModel.$modelValue ) * ( scope.asSeconds ? 1000 : 1 ) );
                        scope.years = getYears( date );
                        scope.days = getDays( date );
                    };

                    render();
                }
            };

    } ] );
