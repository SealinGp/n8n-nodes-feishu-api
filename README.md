[English](./README-EN.md)

# n8n-nodes-feishu-api

本项目 fork 自 [n8n-nodes-feishu-lark](https://github.com/zhgqthomas/n8n-nodes-feishu-lark)，感谢原作者的开源贡献。在原有功能基础上修复了若干问题并新增了知识空间、任务等资源支持。

---

## 安装

在 n8n 的 **Settings → Community Nodes** 中填入：

```
n8n-nodes-feishu-api
```

---

## Credentials 配置

### Tenant Access Token（应用身份）
选择 `Lark Tenant Token API`，填入飞书应用后台的 `App ID` 和 `App Secret`。

### User Access Token（用户身份，OAuth2）
选择 `Lark OAuth2 API`，填入 `App ID`（Client ID）和 `App Secret`（Client Secret）。将生成的 `OAuth Redirect URL` 配置到飞书后台「安全设置 → 重定向 URL」，并在「权限管理」中开通所需权限后填入 `Scope`（如 `base:app:create,offline_access`）。

> 建议开通 `offline_access`，以便 n8n 通过 refresh token 自动续签。

---

## 事件触发（Trigger）

- **WebSocket**（推荐，仅飞书国内版）：添加 `Lark Trigger` 节点，配置 `Lark Tenant Token API` Credential 即可。
- **Webhook**（国际版 Lark）：使用 `Parse Webhook Message` operation 配合 n8n 官方 `Webhook` + `Respond to Webhook` 节点。

---

## 支持的飞书接口

### 消息（Message）

| 操作 | API |
|------|-----|
| 发送消息 | `POST /open-apis/im/v1/messages` |
| 批量发送消息 | `POST /open-apis/message/v4/batch_send/` |
| 回复消息 | `POST /open-apis/im/v1/messages/:message_id/reply` |
| 编辑消息 | `PUT /open-apis/im/v1/messages/:message_id` |
| 转发消息 | `POST /open-apis/im/v1/messages/:message_id/forward` |
| 撤回消息 | `DELETE /open-apis/im/v1/messages/:message_id` |
| 获取消息内容 | `GET /open-apis/im/v1/messages/:message_id` |
| 获取消息资源文件 | `GET /open-apis/im/v1/messages/:message_id/resources/:file_key` |
| 解析消息内容 | *(本地解析，无独立接口)* |
| 上传图片 | `POST /open-apis/im/v1/images` |
| 下载图片 | `GET /open-apis/im/v1/images/:image_key` |
| 上传文件 | `POST /open-apis/im/v1/files` |
| 下载文件 | `GET /open-apis/im/v1/files/:file_key` |
| 发送特定可见卡片 | `POST /open-apis/ephemeral/v1/send` |
| 更新卡片消息 | `PUT /open-apis/im/v1/messages/:message_id` |
| 删除特定可见卡片 | `POST /open-apis/ephemeral/v1/delete` |
| 延时更新消息卡片 | `POST /open-apis/interactive/v1/card/update` |
| 发送并等待 | `POST /open-apis/im/v1/messages` |
| 发送流式消息 | `POST /open-apis/im/v1/messages` |
| 解析 Webhook 消息 | *(本地解析，无独立接口)* |

### 文档（Document）

| 操作 | API |
|------|-----|
| 创建文档 | `POST /open-apis/docx/v1/documents` |
| 获取文档信息 | `GET /open-apis/docx/v1/documents/:document_id` |
| 获取纯文本内容 | `GET /open-apis/docx/v1/documents/:document_id/raw_content` |
| 获取块列表 | `GET /open-apis/docx/v1/documents/:document_id/blocks` |
| 创建块 | `POST /open-apis/docx/v1/documents/:document_id/blocks/:block_id/children` |
| 创建嵌套块 | `POST /open-apis/docx/v1/documents/:document_id/blocks/:block_id/descendant` |
| 更新块内容 | `PATCH /open-apis/docx/v1/documents/:document_id/blocks/:block_id` |
| 获取块内容 | `GET /open-apis/docx/v1/documents/:document_id/blocks/:block_id` |
| 删除块 | `DELETE /open-apis/docx/v1/documents/:document_id/blocks/:block_id/children/batch_delete` |
| Markdown/HTML 转换为块 | `POST /open-apis/docx/v1/documents/blocks/convert` |

### 云空间（Space）

| 操作 | API |
|------|-----|
| 创建文件夹 | `POST /open-apis/drive/v1/files/create_folder` |
| 删除文件或文件夹 | `DELETE /open-apis/drive/v1/files/:file_token` |
| 获取文件列表 | `GET /open-apis/drive/v1/files` |
| 搜索文件 | `POST /open-apis/suite/docs-api/search/object` |
| 上传文件 | `POST /open-apis/drive/v1/files/upload_all` |
| 上传素材 | `POST /open-apis/drive/v1/medias/upload_all` |
| 下载素材 | `GET /open-apis/drive/v1/medias/:file_token/download` |
| 获取素材临时下载链接 | `POST /open-apis/drive/v1/medias/batch_get_tmp_download_url` |

### 知识空间（Wiki）

| 操作 | API |
|------|-----|
| 获取知识空间列表 | `GET /open-apis/wiki/v2/spaces` |
| 获取知识空间信息 | `GET /open-apis/wiki/v2/spaces/:space_id` |
| 更新知识空间设置 | `PUT /open-apis/wiki/v2/spaces/:space_id/setting` |
| 获取成员列表 | `GET /open-apis/wiki/v2/spaces/:space_id/members` |
| 添加成员 | `POST /open-apis/wiki/v2/spaces/:space_id/members` |
| 删除成员 | `DELETE /open-apis/wiki/v2/spaces/:space_id/members/:member_id` |
| 获取节点信息 | `GET /open-apis/wiki/v2/spaces/get_node` |
| 获取子节点列表 | `GET /open-apis/wiki/v2/spaces/:space_id/nodes` |
| 创建节点 | `POST /open-apis/wiki/v2/spaces/:space_id/nodes` |
| 复制节点 | `POST /open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/copy` |
| 移动节点 | `POST /open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/move` |
| 更新节点标题 | `PUT /open-apis/wiki/v2/spaces/:space_id/nodes/:node_token/update_title` |

### 多维表格（Base）

| 操作 | API |
|------|-----|
| 创建多维表格 | `POST /open-apis/bitable/v1/apps` |
| 复制多维表格 | `POST /open-apis/bitable/v1/apps/:app_token/copy` |
| 获取元数据 | `GET /open-apis/bitable/v1/apps/:app_token` |
| 更新元数据 | `PUT /open-apis/bitable/v1/apps/:app_token` |
| 新增数据表 | `POST /open-apis/bitable/v1/apps/:app_token/tables` |
| 批量创建数据表 | `POST /open-apis/bitable/v1/apps/:app_token/tables/batch_create` |
| 更新数据表 | `PUT /open-apis/bitable/v1/apps/:app_token/tables/:table_id` |
| 列出数据表 | `GET /open-apis/bitable/v1/apps/:app_token/tables` |
| 删除数据表 | `DELETE /open-apis/bitable/v1/apps/:app_token/tables/:table_id` |
| 批量删除数据表 | `POST /open-apis/bitable/v1/apps/:app_token/tables/batch_delete` |
| 新增视图 | `POST /open-apis/bitable/v1/apps/:app_token/tables/:table_id/views` |
| 更新视图 | `PUT /open-apis/bitable/v1/apps/:app_token/tables/:table_id/views/:view_id` |
| 列出视图 | `GET /open-apis/bitable/v1/apps/:app_token/tables/:table_id/views` |
| 获取视图 | `GET /open-apis/bitable/v1/apps/:app_token/tables/:table_id/views/:view_id` |
| 删除视图 | `DELETE /open-apis/bitable/v1/apps/:app_token/tables/:table_id/views/:view_id` |
| 新增记录 | `POST /open-apis/bitable/v1/apps/:app_token/tables/:table_id/records` |
| 更新记录 | `PUT /open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id` |
| 查询记录 | `POST /open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/search` |
| 批量获取记录 | `POST /open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_get` |
| 删除记录 | `DELETE /open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id` |
| 批量新增记录 | `POST /open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_create` |
| 批量更新记录 | `POST /open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_update` |
| 批量删除记录 | `POST /open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_delete` |
| 新增字段 | `POST /open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields` |
| 更新字段 | `PUT /open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields/:field_id` |
| 列出字段 | `GET /open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields` |
| 删除字段 | `DELETE /open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields/:field_id` |
| 新增自定义角色 | `POST /open-apis/bitable/v1/apps/:app_token/roles` |
| 更新自定义角色 | `PUT /open-apis/bitable/v1/apps/:app_token/roles/:role_id` |
| 列出自定义角色 | `GET /open-apis/bitable/v1/apps/:app_token/roles` |
| 删除自定义角色 | `DELETE /open-apis/bitable/v1/apps/:app_token/roles/:role_id` |
| 新增协作者 | `POST /open-apis/bitable/v1/apps/:app_token/roles/:role_id/members` |
| 批量新增协作者 | `POST /open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/batch_create` |
| 列出协作者 | `GET /open-apis/bitable/v1/apps/:app_token/roles/:role_id/members` |
| 删除协作者 | `DELETE /open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/:member_id` |
| 批量删除协作者 | `POST /open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/batch_delete` |

### 表格（Spreadsheet）

| 操作 | API |
|------|-----|
| 创建电子表格 | `POST /open-apis/sheets/v3/spreadsheets` |
| 更新电子表格 | `PUT /open-apis/sheets/v3/spreadsheets/:spreadsheet_id` |
| 获取电子表格信息 | `GET /open-apis/sheets/v3/spreadsheets/:spreadsheet_id` |
| 新建工作表 | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/sheets_batch_update` |
| 复制工作表 | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/sheets_batch_update` |
| 删除工作表 | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/sheets_batch_update` |
| 更新工作表 | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/sheets_batch_update` |
| 获取工作表列表 | `GET /open-apis/sheets/v3/spreadsheets/:spreadsheet_id/sheets/query` |
| 获取工作表信息 | `GET /open-apis/sheets/v3/spreadsheets/:spreadsheet_id/sheets/:sheet_id` |
| 增加行列 | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/dimension_range` |
| 插入行列 | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/insert_dimension_range` |
| 更新行列 | `PUT /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/dimension_range` |
| 移动行列 | `POST /open-apis/sheets/v3/spreadsheets/:spreadsheet_id/sheets/:sheet_id/move_dimension` |
| 删除行列 | `DELETE /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/dimension_range` |
| 合并单元格 | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/merge_cells` |
| 拆分单元格 | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/unmerge_cells` |
| 查找单元格 | `POST /open-apis/sheets/v3/spreadsheets/:spreadsheet_id/sheets/:sheet_id/find` |
| 替换单元格 | `POST /open-apis/sheets/v3/spreadsheets/:spreadsheet_id/sheets/:sheet_id/replace` |
| 设置单元格样式 | `PUT /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/style` |
| 插入数据 | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/values_prepend` |
| 追加数据 | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/values_append` |
| 插入图片 | `POST /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/values_image` |
| 读取数据 | `GET /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/values/:range` |
| 写入数据 | `PUT /open-apis/sheets/v2/spreadsheets/:spreadsheet_id/values` |

### 日历（Calendar）

| 操作 | API |
|------|-----|
| 创建共享日历 | `POST /open-apis/calendar/v4/calendars` |
| 删除共享日历 | `DELETE /open-apis/calendar/v4/calendars/:calendar_id` |
| 获取主日历信息 | `GET /open-apis/calendar/v4/calendars/primary` |
| 获取日历信息 | `GET /open-apis/calendar/v4/calendars/:calendar_id` |
| 获取日历列表 | `GET /open-apis/calendar/v4/calendars` |
| 更新日历信息 | `PUT /open-apis/calendar/v4/calendars/:calendar_id` |
| 搜索日历 | `POST /open-apis/calendar/v4/calendars/search` |
| 获取日程忙闲信息 | `POST /open-apis/calendar/v4/freebusy/list` |
| 创建日程 | `POST /open-apis/calendar/v4/calendars/:calendar_id/events` |
| 删除日程 | `DELETE /open-apis/calendar/v4/calendars/:calendar_id/events/:event_id` |
| 搜索日程 | `POST /open-apis/calendar/v4/calendars/:calendar_id/events/search` |
| 获取日程 | `GET /open-apis/calendar/v4/calendars/:calendar_id/events/:event_id` |
| 获取日程列表 | `GET /open-apis/calendar/v4/calendars/:calendar_id/events` |
| 更新日程 | `PUT /open-apis/calendar/v4/calendars/:calendar_id/events/:event_id` |
| 添加日程参与人 | `POST /open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees` |
| 删除日程参与人 | `POST /open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/batch_delete` |
| 获取日程参与人列表 | `GET /open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees` |
| 创建会议群 | `POST /open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/meeting_chat` |
| 解绑会议群 | `DELETE /open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/meeting_chat` |

### 通讯录（Contacts）

| 操作 | API |
|------|-----|
| 批量获取用户信息 | `POST /open-apis/contact/v3/users/batch_get_id` |
| 获取用户信息 | `GET /open-apis/contact/v3/users/:user_id` |

### 任务（Task）

| 操作 | API |
|------|-----|
| 创建任务 | `POST /open-apis/task/v2/tasks` |
| 更新任务 | `PUT /open-apis/task/v2/tasks/:task_guid` |
| 获取任务详情 | `GET /open-apis/task/v2/tasks/:task_guid` |
| 列取任务列表 | `GET /open-apis/task/v2/tasks` |
| 删除任务 | `DELETE /open-apis/task/v2/tasks/:task_guid` |
| 添加任务成员 | `POST /open-apis/task/v2/tasks/:task_guid/add_members` |
| 移除任务成员 | `POST /open-apis/task/v2/tasks/:task_guid/remove_members` |

---

## 开发

```bash
bun install
bun run build    # 编译到 dist/
bun run dev      # 监听模式
bun run test
bun run lint
```

---

## 许可证

MIT License
