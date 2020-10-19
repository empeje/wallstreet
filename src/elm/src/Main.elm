module Main exposing (main)

import Browser
import Html exposing (Html, button, div, form, h5, input, label, section, text)
import Html.Attributes exposing (action, attribute, class, for, id, method, name, placeholder, type_)


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
    section [ class "login" ]
        [ div [ class "container" ]
            [ div [ class "alert alert-danger", id "flash", attribute "role" "alert", attribute "style" "display: none" ]
                []
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


main : Program () Model Msg
main =
    Browser.sandbox
        { init = initialModel
        , view = view
        , update = update
        }