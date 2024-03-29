import { Button, Tooltip } from '@material-ui/core'
import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch, useParams, useHistory } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import { request } from '../../../api'
import { nanoid } from 'nanoid'
import { KEYS, ROLE_STATUS } from '../../../utils/whiteboard/constants'

export default function ListWhiteBoard() {
  const { url } = useRouteMatch()
  const { sessionId } = useParams()
  const history = useHistory()
  const [listWhiteboard, setListWhiteboard] = useState([])
  const columns = [
    {
      title: 'WhiteboardId',
      field: 'id',
      render: (rowData) => <Link to={`${url}/whiteboard/${rowData['id']}?page=1`}>{rowData['id']}</Link>,
    },
    { title: 'Name', field: 'name', render: (rowData) => <p>{rowData['name'] || `Whiteboard ${rowData['id']}`}</p> },
    { title: 'Total page', field: 'page', render: (rowData) => <p>{rowData['totalPage']}</p> },
    { title: 'Created user', field: 'createdUser', render: (rowData) => <p>{rowData['createdBy']}</p> },
  ]

  useEffect(() => {
    void (async () => {
      await request(
        'get',
        `/whiteboards/${sessionId}`,
        (res) => {
          setListWhiteboard(res.data)
        },
        {},
        {},
      )
    })()
  }, [])

  const onCreateNewWhiteboard = async () => {
    const whiteboardId = nanoid()
    // create new whiteboard
    localStorage.removeItem(KEYS.DRAW_DATA_LOCAL_STORAGE)
    localStorage.removeItem(KEYS.TOTAL_PAGE)
    localStorage.removeItem(KEYS.CURRENT_PAGE)
    await request(
      'post',
      '/whiteboards',
      async () => {
        await request(
          'put',
          `/whiteboards/user/${whiteboardId}`,
          (res) => {
            if (res.status === 200) {
              localStorage.setItem(KEYS.USER_ID, res?.data?.userId)
            }
            history.push(`${url}/whiteboard/${whiteboardId}?page=1`)
          },
          {},
          { roleId: ROLE_STATUS.WRITE, statusId: ROLE_STATUS.ACCEPTED },
        )
      },
      {},
      { whiteboardId, classSessionId: sessionId },
    )
  }

  return (
    <div>
      <MaterialTable
        title="Whiteboard List"
        columns={columns}
        data={listWhiteboard}
        localization={{
          header: {
            actions: '',
          },
          body: {
            emptyDataSourceMessage: 'Không có bản ghi nào để hiển thị',
            filterRow: {
              filterTooltip: 'Lọc',
            },
          },
        }}
        options={{
          search: true,
          sorting: false,
          actionsColumnIndex: -1,
          pageSize: 8,
          tableLayout: 'fixed',
        }}
        style={{
          fontSize: 14,
        }}
        actions={[
          {
            icon: () => {
              return (
                <Tooltip title="Thêm bảng viết" aria-label="Thêm bảng viết" placement="top">
                  <Button variant="contained" color="primary" onClick={onCreateNewWhiteboard}>
                    <AddIcon style={{ color: 'white' }} fontSize="default" />
                    &nbsp;&nbsp;&nbsp;Thêm mới&nbsp;&nbsp;
                  </Button>
                </Tooltip>
              )
            },
            isFreeAction: true,
          },
        ]}
      />
    </div>
  )
}
