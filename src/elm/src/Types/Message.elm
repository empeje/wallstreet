module Types.Message exposing (Message, decode)

import Json.Decode as Decode exposing (Decoder, Error)
import Json.Decode.Pipeline exposing (hardcoded, required)


type alias Message =
    { username : String
    , content : String
    , dateString : String
    , avatar : String
    }


decode : Decode.Value -> Result Error Message
decode messageJson =
    Decode.decodeValue
        decoder
        messageJson



-- INTERNAL


decoder : Decoder Message
decoder =
    Decode.succeed Message
        |> required "username" Decode.string
        |> required "content" Decode.string
        |> hardcoded ""
        |> hardcoded "https://bootdey.com/img/Content/avatar/avatar1.png"
