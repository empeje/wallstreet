module Templates.ChatUser exposing (..)

import Html exposing (div, img, p, text)
import Html.Attributes exposing (alt, class, src)


template : String -> String -> Html.Html msg
template avatar username =
    div [ class "chat-user" ]
        [ img [ alt "", class "chat-avatar", src avatar ]
            []
        , div [ class "chat-user-name" ]
            [ p [ class "text-primary" ]
                [ text username ]
            ]
        ]
