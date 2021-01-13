# Upload file to wallet

(see also: [Documentation](https://github.com/idas-solutions/connector-documentation-dc/blob/master/Connector_Integration_Guide.md))

1. POST /RelationshipTemplates - store templateID
1. POST /RelationshipTemplates/{templateID}/Token - store tokenReference
1. User scans token as QR-Code - RelationshipRequest
1. GET /RelationshipRequests/OpenIncoming - store requestID
1. PUT /RelationshipRequests/{requestID}/Accept
1. POST /Files (some sort of certificate)
1. POST /Messages - attach uploaded file
