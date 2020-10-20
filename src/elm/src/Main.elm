port module Main exposing (main)

import Browser
import Html exposing (Html, button, div, form, h5, input, label, section, text)
import Html.Attributes exposing (action, attribute, class, for, id, method, name, placeholder, type_)


port flash : (String -> msg) -> Sub msg


type alias Flags =
    { flash : String
    }


type Msg
    = Flash String


type alias Model =
    { flashMessage : String }


init : Flags -> ( Model, Cmd Msg )
init flag =
    ( Model flag.flash, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Flash val ->
            ( { model | flashMessage = val }, Cmd.none )


view : Model -> Html msg
view model =
    let
        flashStyle =
            if model.flashMessage == "" then
                [ attribute "style" "display: none" ]

            else
                []

        flashText =
            if model.flashMessage == "" then
                []

            else
                [ text model.flashMessage ]
    in
    section [ class "login" ]
        [ div [ class "container" ]
            [ div (List.append [ class "alert alert-danger", id "flash", attribute "role" "alert" ] flashStyle)
                flashText
            , div [ class "row" ]
                [ div [ class "col-sm-9 col-md-7 col-lg-5 mx-auto" ]
                    [ div [ class "card card-signin my-5" ]
                        [ div [ class "card-body" ]
                            [ h5 [ class "card-title text-center" ]
                                [ text "Sign In" ]
                            , form [ action "chat.html", class "form-signin", id "signin-form", method "GET" ]
                                [ div [ class "form-label-group" ]
                                    [ input [ attribute "autofocus" "", class "form-control", id "inputUsername", name "username", placeholder "Username", attribute "required" "", type_ "text" ]
                                        []
                                    , label [ for "inputUsername" ]
                                        [ text "Username" ]
                                    ]
                                , div [ class "form-label-group" ]
                                    [ input [ class "form-control", id "inputPort", name "port", placeholder "Port", attribute "required" "", type_ "text" ]
                                        []
                                    , label [ for "inputPort" ]
                                        [ text "Port" ]
                                    ]
                                , button [ class "btn btn-lg btn-primary btn-block text-uppercase", type_ "submit" ]
                                    [ text "Sign in" ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]


subscriptions : Model -> Sub Msg
subscriptions _ =
    flash Flash


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
