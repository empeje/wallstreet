port module Chat exposing (activePort, main, username)

import Browser
import Html exposing (Html, a, div, p, section, small, span, text, textarea)
import Html.Attributes exposing (class, href, id, name, placeholder)


port activePort : (String -> msg) -> Sub msg


port username : (String -> msg) -> Sub msg


type alias Model =
    { activePort : String, username : String, count : Int }


init : () -> ( Model, Cmd Msg )
init flags =
    ( { activePort = "", username = "", count = 0 }
    , Cmd.none
    )


type Msg
    = Increment
    | Decrement
    | ActivePort String
    | Username String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Increment ->
            ( { model | count = model.count + 1 }, Cmd.none )

        Decrement ->
            ( { model | count = model.count - 1 }, Cmd.none )

        ActivePort val ->
            ( { model | activePort = val }, Cmd.none )

        Username val ->
            ( { model | username = val }, Cmd.none )


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
                                [ text model.username ]
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
                                    [ text model.activePort ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch [ activePort ActivePort, username Username ]


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
