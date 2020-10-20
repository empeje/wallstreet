module Templates.OutgoingMsg exposing (..)

import Html exposing (div, img, p, span, text)
import Html.Attributes exposing (alt, class, src)
import Types.Message exposing (Message)


template : Message -> Html.Html msg
template message =
    let
        { content, username, avatar, dateString } =
            message
    in
    div [ class "chat-message right" ]
        [ img [ alt "", class "message-avatar", src avatar ]
            []
        , div [ class "message" ]
            [ p [ class "message-author text-primary" ]
                [ text username ]
            , span [ class "message-date" ]
                [ text dateString ]
            , span [ class "message-content" ]
                [ text content ]
            ]
        ]
