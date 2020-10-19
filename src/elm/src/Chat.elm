module Chat exposing (main)

import Browser
import Html exposing (Html, a, button, div, p, section, small, span, text, textarea)
import Html.Attributes exposing (class, href, id, name, placeholder)


type alias Model =
    { count : Int }


initialModel : Model
initialModel =
    { count = 0 }


type Msg
    = Increment
    | Decrement


update : Msg -> Model -> Model
update msg model =
    case msg of
        Increment ->
            { model | count = model.count + 1 }

        Decrement ->
            { model | count = model.count - 1 }


view : Model -> Html Msg
view model =
    section [ class "chat" ]
        [ div [ class "container" ]
            [ div [ class "row" ]
                [ div [ class "col-lg-12" ]
                    [ div [ class "ibox chat-view" ]
                        [ div [ class "ibox-title text-muted" ]
                            [ small [ class "pull-right", id "connection-status" ]
                                [ text "Checking connection..." ]
                            , text "("
                            , span [ id "username" ]
                                []
                            , text " | "
                            , a [ class "text-info", href "index.html" ]
                                [ text "Logout" ]
                            , text ") Chat panel"
                            ]
                        , div [ class "ibox-content" ]
                            [ div [ class "row" ]
                                [ div [ class "col-md-9" ]
                                    [ div [ class "chat-discussion", id "chatbox" ]
                                        []
                                    ]
                                , div [ class "col-md-3" ]
                                    [ div [ class "chat-users" ]
                                        [ div [ class "users-list", id "users-list" ]
                                            []
                                        ]
                                    ]
                                ]
                            , div [ class "row" ]
                                [ div [ class "col-lg-12" ]
                                    [ div [ class "chat-message-form" ]
                                        [ div [ class "form-group" ]
                                            [ textarea [ class "form-control message-input", id "new-message", name "message", placeholder "Enter message text and press enter" ]
                                                []
                                            ]
                                        ]
                                    ]
                                ]
                            ]
                        , div [ class "ibox-footer text-muted" ]
                            [ p []
                                [ text "Chat client listening on port "
                                , span [ id "port" ]
                                    []
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]


main : Program () Model Msg
main =
    Browser.sandbox
        { init = initialModel
        , view = view
        , update = update
        }
