# Twitch API v2

## Overview

The Twitch API enables you to develop your own applications using the rich feature set that we provide. Features include retrieving data about what streams are live, changing information about specific channels, and doing an SSO integration with Twitch. The following pages list the resources that the Twitch API provides. If you have any questions or need help in using this API, please visit the [API Developers Group][] or [Github Issues][].

The Twitch API is comprised of two parts: the REST API and a [JavaScript SDK][] that allows for easy integration of the Twitch features into any website. Most users will only need to use the JS SDK, but if you want a deeper integration (for example, for use with Python or PHP scripts), you may access the REST API directly. The [RESTful Integration Guide][] provides additional information for using REST API.

[API Developers Group]: https://groups.google.com/forum/?fromgroups#!forum/twitch-api
[JavaScript SDK]: /../../../twitch-js-sdk
[Github Issues]: /../../issues
[RESTful Integration Guide]: /RESTful-Integration-Guide.md

### API Versions and MIME Types

The current stable API version is **v2**. We allow clients to use any version of our API. Versioning is per-method so for example you can have v1 of `/channels` and v2 of `/users`. 

__We *strongly* recommend specifying a version, otherwise version updates might break your application if you've defaulted your requests to use the latest version.__

When specifying a version for a request to the Twitch API, set the `Accept` HTTP header to the API version you prefer. This is done by appending a version specifier to our vendor specific MIME type. Responses will have an `x-api-version` header that will indicate which version you received.

You should specify the following MIME type:

```bash
application/vnd.twitchtv[.version]+json
```

The returned MIME type from requests is always

```bash
application/json
```

<a name="requests"/>
#### Example Requests

Specify a specific version (v2):

    curl -i -H 'Accept: application/vnd.twitchtv.v2+json' 'https://api.twitch.tv/kraken/channels/hebo?client_id=axjhfp777tflhy0yjb5sftsil' 
    
    HTTP/1.1 200 OK
    ...
    x-api-version: 2
    ...
    Front-End-Https: on
    
    { ...

### Formats

The base URL for all API resources is `https://api.twitch.tv/kraken`.

All data is sent and received as [JSON][]. Blank fields are included as `null` instead of being omitted.

[JSON]: http://www.json.org/

### JSON-P

All API methods support [JSON-P][] by providing a `callback` parameter with the request.

```bash
curl -i https://api.twitch.tv/kraken?callback=foo
```

[JSON-P]: http://json-p.org/

### Self-Describing API

The API is self-describing and can be explored from the base URL:

```bash
curl -i https://api.twitch.tv/kraken
```

Every JSON response includes a `_links` object which allows you to navigate the API without having to hardcode any of our URLs.

```json
{
    "_links": {
        "teams": "https://api.twitch.tv/kraken/teams",
        "channel": "https://api.twitch.tv/kraken/channel",
        "user": "https://api.twitch.tv/kraken/user",
        "ingests": "https://api.twitch.tv/kraken/ingests",
        "streams": "https://api.twitch.tv/kraken/streams",
        "search": "https://api.twitch.tv/kraken/search"
    },
    ...
}
```

### Errors

All error responses are in the following format, delivered with the corresponding status code:

```json
{
    "message":"Invalid Token",
    "status":401,
    "error":"Unauthorized"
}
```

When using JSON-P, the status code will always be `200` to allow browsers to parse it. Check the body of the response for the actual error data.

### Rate Limits

We require you to send your application's `client_id` with every request you make to ensure that your application is not rate limited. You should do so by sending the following HTTP header:

```bash
Client-ID: <client_id>
```

### Terms of Service

Please review our [Terms of Service](http://www.twitch.tv/user/legal?page=api_terms_of_service) for the Twitch API.

<a name="oauth"/>
<a name="wiki-auth"/>
## Authentication 

We use an OAuth 2.0, an authentication protocol designed to make accessing user accounts from third party clients easy and secure. Read our [authentication guide][] to see how to connect with Twitch users from your own service.

[authentication guide]: /authentication.md

## Index

### [Blocks](/v2_resources/blocks.md)

| Endpoint | Description |
| ---- | --------------- |
| [GET /users/:login/blocks](/v2_resources/blocks.md#get-usersloginblocks) | Get user's block list |
| [PUT /users/:user/blocks/:target](/v2_resources/blocks.md#put-usersuserblockstarget) | Update user's block list |
| [DELETE /users/:user/blocks/:target](/v2_resources/blocks.md#delete-usersuserblockstarget) | Delete target from user's block list |

### [Channels](/v2_resources/channels.md)

| Endpoint | Description |
| ---- | --------------- |
| [GET /channels/:channel](/v2_resources/channels.md#get-channelschannel) | Get channel object|
| [GET /channel](/v2_resources/channels.md#get-channel) | Get channel object |
| [GET /channels/:channel/editors](/v2_resources/channels.md#get-channelschanneleditors) | Get channel's list of editors |
| [PUT /channels/:channel](/v2_resources/channels.md#put-channelschannel) | Update channel object |
| [GET /channels/:channel/videos](/v2_resources/channels.md#get-channelschannelvideos) | Get channel's list of videos |
| [GET /channels/:channel/follows](/v2_resources/channels.md#get-channelschannelfollows) | Get channel's list of following users |
| [DELETE /channels/:channel/stream_key](/v2_resources/channels.md#delete-channelschannelstream_key) | Reset channel's stream key |
| [POST /channels/:channel/commercial](/v2_resources/channels.md#post-channelschannelcommercial) | Start a commercial on channel |

### [Chat](/v2_resources/chat.md)

| Endpoint | Description |
| ---- | --------------- |
| [GET /chat/:channel](/v2_resources/chat.md#get-chatchannel) | Get links object to other chat endpoints |
| [GET /chat/emoticons](/v2_resources/chat.md#get-chatemoticons) | Get list of every emoticon object |

### [Follows](/v2_resources/follows.md)

| Endpoint | Description |
| ---- | --------------- |
| [GET /channels/:channel/follows](/v2_resources/follows.md#get-channelschannelfollows) | Get channel's list of following users |
| [GET /users/:user/follows/channels](/v2_resources/follows.md#get-usersuserfollowschannels) | Get a user's list of followed channels |
| [GET /users/:user/follows/channels/:target](/v2_resources/follows.md#get-usersuserfollowschannelstarget) | Get status of follow relationship between user and target channel |
| [PUT /users/:user/follows/channels/:target](/v2_resources/follows.md#put-usersuserfollowschannelstarget) | Follow a channel |
| [DELETE /users/:user/follows/channels/:target](/v2_resources/follows.md#delete-usersuserfollowschannelstarget) | Unfollow a channel |

### [Games](/v2_resources/games.md)

| Endpoint | Description |
| ---- | --------------- |
| [GET /games/top](/v2_resources/games.md#get-gamestop) | Get games by number of viewers |

### [Ingests](/v2_resources/ingests.md)

| Endpoint | Description |
| ---- | --------------- |
| [GET /ingests](/v2_resources/ingests.md#get-ingests) | Get list of ingests |

### [Root] (/v2_resources/root.md)

| Endpoint | Description |
| ---- | --------------- |
| [GET /](/v2_resources/root.md#get-) | Get top level links object and authorization status |

### [Search](/v2_resources/search.md)

| Endpoint | Description |
| ---- | --------------- |
| [GET /search/streams](/v2_resources/search.md#get-searchstreams) | Find streams |
| [GET /search/games](/v2_resources/search.md#get-searchgames) | Find games |

### [Streams](/v2_resources/streams.md)

| Endpoint | Description |
| ---- | --------------- |
| [GET /streams/:channel/](/v2_resources/streams.md#get-streamschannel) | Get stream object |
| [GET /streams](/v2_resources/streams.md#get-streams) | Get stream object |
| [GET /streams/featured](/v2_resources/streams.md#get-streamsfeatured) | Get a list of featured streams |
| [GET /streams/summary](/v2_resources/streams.md#get-streamssummary) | Get a summary of streams |
| [GET /streams/followed](/v2_resources/streams.md#get-streamsfollowed) | Get a list of streams user is following |

### [Subscriptions](/v2_resources/subscriptions.md)

| Endpoint | Description |
| ---- | --------------- |
| [GET /channels/:channel/subscriptions](/v2_resources/subscriptions.md#get-channelschannelsubscriptions) | Get list of users subscribed to channel |
| [GET /channels/:channel/subscriptions/:user](/v2_resources/subscriptions.md#get-channelschannelsubscriptionsuser) | Check if channel has user subscribed |

### [Teams](/v2_resources/teams.md)

| Endpoint | Description |
| ---- | --------------- |
| [GET /teams](/v2_resources/teams.md#get-teams) | Get list of active team objects |
| [GET /teams/:team](/v2_resources/teams.md#get-teamsteam) | Get team object |

### [Users](/v2_resources/users.md)

| Endpoint | Description |
| ---- | --------------- |
| [GET /users/:user](/v2_resources/users.md#get-usersuser) | Get user object |
| [GET /user](/v2_resources/users.md#get-user) | Get user object |
| [GET /streams/followed](/v2_resources/users.md#get-streamsfollowed) | Get list of streams user is following |

### [Videos](/v2_resources/videos.md)

| Endpoint | Description |
| ---- | --------------- |
| [GET /videos/:id](/v2_resources/videos.md#get-videosid) | Get video object|
| [GET /videos/top](/v2_resources/videos.md#get-videostop) | Get top videos by number of views |
| [GET /channels/:channel/videos](/v2_resources/videos.md#get-channelschannelvideos) | Get list of video objects belonging to channel |

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/56e6a90fa031ae920e36cf219184c33c "githalytics.com")](http://githalytics.com/justintv/Twitch-API)
