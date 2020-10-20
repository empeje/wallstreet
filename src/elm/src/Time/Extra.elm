module Time.Extra exposing (toDateString)

import Time exposing (Weekday(..), toHour, toMinute, toSecond, toWeekday)


toDateString : Time.Zone -> Time.Posix -> String
toDateString zone time =
    toEnglishWeekday (toWeekday zone time)
        ++ ","
        ++ String.fromInt (toHour zone time)
        ++ ":"
        ++ String.fromInt (toMinute zone time)
        ++ ":"
        ++ String.fromInt (toSecond zone time)
        ++ " (UTC)"


toEnglishWeekday : Weekday -> String
toEnglishWeekday weekday =
    case weekday of
        Mon ->
            "Monday"

        Tue ->
            "Tuesday"

        Wed ->
            "Wednesday"

        Thu ->
            "Thursday"

        Fri ->
            "Frida"

        Sat ->
            "Saturday"

        Sun ->
            "Sunday"
