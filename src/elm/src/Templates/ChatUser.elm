module Templates.ChatUser exposing (..)

import Html exposing (div, img, p, text)
import Html.Attributes exposing (alt, class, src)


template : String -> Html.Html msg
template username =
    div [ class "chat-user" ]
        [ img [ alt "", class "chat-avatar", src "https://bootdey.com/img/Content/avatar/avatar1.png" ]
            []
        , div [ class "chat-user-name" ]
            [ p [ class "text-primary" ]
                [ text username ]
            ]
        ]
