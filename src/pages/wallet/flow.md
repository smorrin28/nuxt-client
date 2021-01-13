# Upload file to wallet

Detailed Overview: [Documentation](https://github.com/idas-solutions/connector-documentation-dc/blob/master/Connector_Integration_Guide.md)

1. POST /RelationshipTemplates ([Example Content](https://github.com/idas-solutions/connector-documentation-dc/blob/master/examples/RelationshipTemplates/template_daad_fill.json)) - store templateID
1. POST /RelationshipTemplates/{templateID}/Token (Accept: image/\*) - display QR-Code
1. User scans QR-Code - RelationshipRequest
1. GET /RelationshipRequests/OpenIncoming - store requestID
1. PUT /RelationshipRequests/{requestID}/Accept
1. POST /Files (some sort of certificate)
1. POST /Messages - attach uploaded file
