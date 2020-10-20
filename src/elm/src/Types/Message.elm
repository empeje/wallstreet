module Types.Message exposing (Message, decode, isIncoming, newOutgoing)

import Json.Decode as Decode exposing (Decoder, Error)
import Json.Decode.Pipeline exposing (hardcoded, required)


type Type
    = Incoming
    | Outgoing


type alias Message =
    { username : String
    , content : String
    , dateString : String
    , avatar : String
    , messageType : Type
    }


decode : Decode.Value -> Result Error Message
decode messageJson =
    Decode.decodeValue
        decoder
        messageJson


newOutgoing : String -> String -> String -> String -> Message
newOutgoing username content dateString avatar =
    Message username content dateString avatar Outgoing


isIncoming : { a | messageType : Type } -> Bool
isIncoming message =
    case message.messageType of
        Incoming ->
            True

        Outgoing ->
            False



-- INTERNAL


decoder : Decoder Message
decoder =
    Decode.succeed Message
        |> required "username" Decode.string
        |> required "content" Decode.string
        |> hardcoded ""
        |> hardcoded "https://bootdey.com/img/Content/avatar/avatar1.png"
        |> hardcoded Incoming
