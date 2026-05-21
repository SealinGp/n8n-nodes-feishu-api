[中文](./README.md)

# n8n-nodes-feishu-api

This project is forked from [n8n-nodes-feishu-lark](https://github.com/zhgqthomas/n8n-nodes-feishu-lark). Thanks to the original author for their open-source contribution. This fork fixes several bugs and adds support for Wiki Spaces and Task resources.

---

## Installation

In n8n **Settings → Community Nodes**, enter:

```
n8n-nodes-feishu-api
```

---

## Credentials

### Tenant Access Token (App Identity)
Select `Lark Tenant Token API` and fill in `App ID` and `App Secret` from the Feishu app console.

### User Access Token (OAuth2)
Select `Lark OAuth2 API`, fill in `App ID` (Client ID) and `App Secret` (Client Secret). Configure the generated `OAuth Redirect URL` in the Feishu app console under Security Settings → Redirect URL, and add the required scopes (e.g. `base:app:create,offline_access`).

> Enable `offline_access` so n8n can auto-refresh expired access tokens.

---

## Triggers

- **WebSocket** (recommended, Feishu China only): Add a `Lark Trigger` node with a `Lark Tenant Token API` credential.
- **Webhook** (Lark international): Use `Parse Webhook Message` operation together with n8n's `Webhook` + `Respond to Webhook` nodes.

---

## Supported Feishu APIs

### Message

| Operation | API |
|-----------|-----|
| Send | `POST /open-apis/im/v1/messages` |
| Batch Send | `POST /open-apis/message/v4/batch_send/` |
| Reply | `POST /open-apis/im/v1/messages/:message_id/reply` |
| Edit | `PUT /open-apis/im/v1/messages/:message_id` |
| Forward | `POST /open-apis/im/v1/messages/:message_id/forward` |
| Recall | `DELETE /open-apis/im/v1/messages/:message_id` |
| Get Content Info | `GET /open-apis/im/v1/messages/:message_id` |
| Get Content Resource | `GET /open-apis/im/v1/messages/:message_id/resources/:file_key` |
| Parse Content | *(local parsing, no dedicated endpoint)* |
| Upload Image | `POST /open-apis/im/v1/images` |
| Download Image | `GET /open-apis/im/v1/images/:image_key` |
| Upload File | `POST /open-apis/im/v1/files` |
| Download File | `GET /open-apis/im/v1/files/:file_key` |
| Send Limited Card | `POST /open-apis/ephemeral/v1/send` |
| Update Card | `PUT /open-apis/im/v1/messages/:message_id` |
| Delete Limited Card | `POST /open-apis/ephemeral/v1/delete` |
| Update Interactive Card | `POST /open-apis/interactive/v1/card/update` |
| Send and Wait | `POST /open-apis/im/v1/messages` |
| Send Stream Message | `POST /open-apis/im/v1/messages` |
| Parse Webhook Message | *(local parsing, no dedicated endpoint)* |

### Document

| Operation | API |
|-----------|-----|
| Create | `POST /open-apis/docx/v1/documents` |
| Get Info | `GET /open-apis/docx/v1/documents/:document_id` |
| Get Raw Content | `GET /open-apis/docx/v1/documents/:document_id/raw_content` |
| Get Block List | `GET /open-apis/docx/v1/documents/:document_id/blocks` |
| Create Block | `POST /open-apis/docx/v1/documents/:document_id/blocks/:block_id/children` |
| Create Nested Block | `POST /open-apis/docx/v1/documents/:document_id/blocks/:block_id/descendant` |
| Update Block | `PATCH /open-apis/docx/v1/documents/:document_id/blocks/:block_id` |
| Get Block | `GET /open-apis/docx/v1/documents/:document_id/blocks/:block_id` |
| Delete Block | `DELETE /open-apis/docx/v1/documents/:document_id/blocks/:block_id/children/batch_delete` |
| Markdown/HTML Convert to Block | `POST /open-apis/docx/v1/documents/blocks/convert` |

### Space (Drive)

| Operation | API |
|-----------|-----|
| Create Folder | `POST /open-apis/drive/v1/files/create_folder` |
| Delete File or Folder | `DELETE /open-apis/drive/v1/files/:file_token` |
| Get File List | `GET /open-apis/drive/v1/files` |
| Search Files | `POST /open-apis/suite/docs-api/search/object` |
| Upload File | `POST /open-apis/drive/v1/files/upload_all` |
| Upload Media | `POST /open-apis/drive/v1/medias/upload_all` |
| Download Media | `GET /open-apis/drive/v1/medias/:file_token/download` |
| Get Media Temp Download Link | `POST /open-apis/drive/v1/medias/batch_get_tmp_download_url` |

### Wiki Spaces

| Operation | API |
|-----------|-----|
| Get Space List | `GET /open-apis/wiki/v2/spaces` |
| Get Space Info | `GET /open-apis/wiki/v2/spaces/:space_id` |
| Update Space Setting | `PUT /open-apis/wiki/v2/spaces/:space_id/setting` |
| Get Members | `GET /open-apis/wiki/v2/spaces/:space_id/members` |
| Add Member | `POST /open-apis/wiki/v2/spaces/:space_id/members` |
| Delete Member | `DELETE /open-apis/wiki/v2/spaces/:space_id/members/:member_id` |
| Get Node Info | `GET /open-apis/wiki/v2/spaces/get_node` |
| Get Child Nodes | `GET /open-apis/wiki/v2/spaces/:space_id/nodes` |
| Create Node | `POST /open-apis/wiki/v2/spaces/:space_id/nodes` |
| Copy Node | `POST /open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/copy` |
| Move Node | `POST /open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/move` |
| Update Node Title | `PUT /open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/update_title` |

### Base (Bitable)

| Operation | API |
|-----------|-----|
| Create App | `POST /open-apis/bitable/v1/apps` |
| Copy App | `POST /open-apis/bitable/v1/apps/:app_token/copy` |
| Get App Info | `GET /open-apis/bitable/v1/apps/:app_token` |
| Update App Info | `PUT /open-apis/bitable/v1/apps/:app_token` |
| Create Table | `POST /open-apis/bitable/v1/apps/:app_token/tables` |
| Batch Create Tables | `POST /open-apis/bitable/v1/apps/:app_token/tables/batch_create` |
| Update Table | `PUT /open-apis/bitable/v1/apps/:app_token/tables/:table_id` |
| Get Tables | `GET /open-apis/bitable/v1/apps/:app_token/tables` |
| Delete Table | `DELETE /open-apis/bitable/v1/apps/:app_token/tables/:table_id` |
| Batch Delete Tables | `POST /open-apis/bitable/v1/apps/:app_token/tables/batch_delete` |
| Create View | `POST /open-apis/bitable/v1/apps/:app_token/tables/:table_id/views` |
| Update View | `PUT /open-apis/bitable/v1/apps/:app_token/tables/:table_id/views/:view_id` |
| Get Views | `GET /open-apis/bitable/v1/apps/:app_token/tables/:table_id/views` |
| Get View Info | `GET /open-apis/bitable/v1/apps/:app_token/tables/:table_id/views/:view_id` |
| Delete View | `DELETE /open-apis/bitable/v1/apps/:app_token/tables/:table_id/views/:view_id` |
| Create Record | `POST /open-apis/bitable/v1/apps/:app_token/tables/:table_id/records` |
| Update Record | `PUT /open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id` |
| Search Records | `POST /open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/search` |
| Get Records | `POST /open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_get` |
| Delete Record | `DELETE /open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id` |
| Batch Create Records | `POST /open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_create` |
| Batch Update Records | `POST /open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_update` |
| Batch Delete Records | `POST /open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_delete` |
| Create Field | `POST /open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields` |
| Update Field | `PUT /open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields/:field_id` |
| Get Fields | `GET /open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields` |
| Delete Field | `DELETE /open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields/:field_id` |
| Create Role | `POST /open-apis/bitable/v1/apps/:app_token/roles` |
| Update Role | `PUT /open-apis/bitable/v1/apps/:app_token/roles/:role_id` |
| Get Roles | `GET /open-apis/bitable/v1/apps/:app_token/roles` |
| Delete Role | `DELETE /open-apis/bitable/v1/apps/:app_token/roles/:role_id` |
| Create Role Member | `POST /open-apis/bitable/v1/apps/:app_token/roles/:role_id/members` |
| Batch Create Role Members | `POST /open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/batch_create` |
| Get Role Members | `GET /open-apis/bitable/v1/apps/:app_token/roles/:role_id/members` |
| Delete Role Member | `DELETE /open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/:member_id` |
| Batch Delete Role Members | `POST /open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/batch_delete` |

### Spreadsheet

| Operation | API |
|-----------|-----|
| Create | `POST /open-apis/sheets/v3/spreadsheets` |
| Update | `PUT /open-apis/sheets/v3/spreadsheets/:spreadsheet_id` |
| Get Info | `GET /open-apis/sheets/v3/spreadsheets/:spreadsheet_id` |
| Create Sheet | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/sheets_batch_update` |
| Copy Sheet | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/sheets_batch_update` |
| Delete Sheet | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/sheets_batch_update` |
| Update Sheet | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/sheets_batch_update` |
| Get Sheet List | `GET /open-apis/sheets/v3/spreadsheets/:spreadsheet_id/sheets/query` |
| Get Sheet Info | `GET /open-apis/sheets/v3/spreadsheets/:spreadsheet_id/sheets/:sheet_id` |
| Create Dimension | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/dimension_range` |
| Insert Dimension | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/insert_dimension_range` |
| Update Dimension | `PUT /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/dimension_range` |
| Move Dimension | `POST /open-apis/sheets/v3/spreadsheets/:spreadsheet_id/sheets/:sheet_id/move_dimension` |
| Delete Dimension | `DELETE /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/dimension_range` |
| Merge Cells | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/merge_cells` |
| Split Cells | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/unmerge_cells` |
| Find Cells | `POST /open-apis/sheets/v3/spreadsheets/:spreadsheet_id/sheets/:sheet_id/find` |
| Replace Cells | `POST /open-apis/sheets/v3/spreadsheets/:spreadsheet_id/sheets/:sheet_id/replace` |
| Set Cell Style | `PUT /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/style` |
| Insert Values | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/values_prepend` |
| Append Values | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/values_append` |
| Insert Image | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/values_image` |
| Read Values | `GET /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/values/:range` |
| Write Values | `PUT /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/values` |

### Calendar

| Operation | API |
|-----------|-----|
| Create Calendar | `POST /open-apis/calendar/v4/calendars` |
| Delete Calendar | `DELETE /open-apis/calendar/v4/calendars/:calendar_id` |
| Get Primary Info | `GET /open-apis/calendar/v4/calendars/primary` |
| Get Info | `GET /open-apis/calendar/v4/calendars/:calendar_id` |
| Get List | `GET /open-apis/calendar/v4/calendars` |
| Update Calendar | `PUT /open-apis/calendar/v4/calendars/:calendar_id` |
| Search Calendar | `POST /open-apis/calendar/v4/calendars/search` |
| Availability | `POST /open-apis/calendar/v4/freebusy/list` |
| Create Event | `POST /open-apis/calendar/v4/calendars/:calendar_id/events` |
| Delete Event | `DELETE /open-apis/calendar/v4/calendars/:calendar_id/events/:event_id` |
| Search Event | `POST /open-apis/calendar/v4/calendars/:calendar_id/events/search` |
| Get Event | `GET /open-apis/calendar/v4/calendars/:calendar_id/events/:event_id` |
| Get Event List | `GET /open-apis/calendar/v4/calendars/:calendar_id/events` |
| Update Event | `PUT /open-apis/calendar/v4/calendars/:calendar_id/events/:event_id` |
| Create Event Attendee | `POST /open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees` |
| Delete Event Attendee | `POST /open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/batch_delete` |
| Get Event Attendee List | `GET /open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees` |
| Create Meeting Chat | `POST /open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/meeting_chat` |
| Unbind Meeting Chat | `DELETE /open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/meeting_chat` |

### Contacts

| Operation | API |
|-----------|-----|
| Batch Get User Info | `POST /open-apis/contact/v3/users/batch_get_id` |
| Get User Info | `GET /open-apis/contact/v3/users/:user_id` |

### Task

| Operation | API |
|-----------|-----|
| Create | `POST /open-apis/task/v2/tasks` |
| Update | `PUT /open-apis/task/v2/tasks/:task_guid` |
| Get Info | `GET /open-apis/task/v2/tasks/:task_guid` |
| Get List | `GET /open-apis/task/v2/tasks` |
| Delete | `DELETE /open-apis/task/v2/tasks/:task_guid` |
| Add Members | `POST /open-apis/task/v2/tasks/:task_guid/add_members` |
| Remove Members | `POST /open-apis/task/v2/tasks/:task_guid/remove_members` |

---

## Development

```bash
bun install
bun run build    # compile to dist/
bun run dev      # watch mode
bun run test
bun run lint
```

---

## License

MIT License
