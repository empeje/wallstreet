module Templates.OutgoingMsg exposing (..)

import Html exposing (a, div, img, span, text)
import Html.Attributes exposing (alt, class, href, src)


template =
    div [ class "chat-message right" ]
        [ img [ alt "", class "message-avatar", src "{{avatar}}" ]
            []
        , div [ class "message" ]
            [ p [ class "message-author text-primary" ]
                [ text "{{username}}    " ]
            , span [ class "message-date" ]
                [ text "{{dateString}}    " ]
            , span [ class "message-content" ]
                [ text "{{message}}    " ]
            ]
        ]
