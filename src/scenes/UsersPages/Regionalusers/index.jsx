import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { CircularProgress } from "@mui/material";
import { get_all_regions } from "../../../config/apicalls/regionApiCall";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AlertDialogSlide from "../../global/dialogue";
import { deactivate_user, delete_user } from "../../../config/apicalls/usersapi";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
const Regionalusers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mockdata, setMockdata] = useState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [opendec, setOpenDec] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const handleC = (id) => {
    setSelectedId(id);
    setOpen(!open);
  };

  const handleD = (id) => {
    setSelectedId(id);
    setOpenDec(!opendec);
  };

  useEffect(() => {
    get_all_regions().then((res) => {
      if (res.success && res.data) {
        console.log(res.data);
        setMockdata(res.data);
      } else {
        console.log(res.error);
      }
    });
  }, []);

  const diactivateHandler = (selectedId) => {
    deactivate_user(selectedId).then((res) => {
      if (res.success && res.data) {
        console.log(res.data);
      } else {
        console.log(res.error);
      }
    });
    setOpenDec(false);
  };

  const deleteHandler = (selectedId) => {
    delete_user(selectedId).then((res) => {
      if (res.success && res.data) {
        console.log(res.data);
        mockdata = mockdata.filter(obj => obj.user.id !== selectedId);
        console.log(mockdata)
        setMockdata(mockdata)
      } else {
        console.log(res.error);
      }
    });
    setOpen(false);
  };

  const editHandler = (u_id) => {
    navigate(`/updateuser/${u_id}`);
    console.log(u_id);
  };

  const columns = [
    // { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "fname",
      headerName: "First Name",
      flex: 0.8,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row?.user?.userprofile?.fname,
      disableColumnFilter: true,
    },

    {
      field: "Mname",
      headerName: "Middle Name",
      // flex: 0.5,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row?.user?.userprofile?.Mname,
      disableColumnFilter: true,
    },
    {
      field: "lname",
      headerName: "Last Name",
      // flex: 0.5,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row?.user?.userprofile?.lname,
      disableColumnFilter: true,
    },

    {
      field: "sex",
      headerName: "Gender",
      // flex: 0.2,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row?.user?.userprofile?.sex,
      disableColumnFilter: true,
    },

    {
      field: "phone",
      headerName: "Phone Number",
      // flex: 0.5,
      valueGetter: (params) => params.row?.user?.userprofile?.phone,
      disableColumnFilter: true,
    },
    {
      field: "Region_name",
      headerName: "Region",
      // flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      valueGetter: (params) => params.row?.user?.email,
      disableColumnFilter: true,
    },
    {
      field: "is_active",
      headerName: "User Status",
      flex: 0.8,
      cellClassName: "name-column--cell",
      disableColumnFilter: true,
      renderCell: (params) => {
        if (params.row?.user?.is_active === true) {
          return <CheckCircleOutlineIcon style={{ color: "green" }} />;
        } else {
          return <RemoveCircleOutlineIcon style={{ color: "red" }} />;
        }
      },
    },
    {
      field: "accessLevel",
      headerName: "Manage User",
      flex: 3,
      renderCell: (params) => {
        return (
          <Box display="flex" p="0px">
            <Box
              width="100%"
              m="0 10px 0 0 "
              p="2px"
              display="flex"
              justifyContent="center"
              backgroundColor={colors.greenAccent[600]}
              borderRadius="4px"
            >
              <Button
                onClick={() => editHandler(params.row.id)}
                variant="text"
                size="small"
              >
                Update
              </Button>
            </Box>

            <Box
              width="60%"
              m="0 15px 0 0 "
              display="flex"
              justifyContent="center"
              backgroundColor={colors.redAccent[500]}
              borderRadius="4px"
            >
              <Button onClick={()=>handleC(params.row.user.id)} variant="text">
                <Delete></Delete>
              </Button>
            </Box>
            <Box
              width="60%"
              m="0 10px 0 0 "
              display="flex"
              justifyContent="center"
              backgroundColor={colors.greenAccent[600]}
              borderRadius="4px"
              onClick={() => {
                handleD(params.row.user.id);
              }}
            >
              <Button variant="text">Deactivate</Button>
            </Box>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <AlertDialogSlide
        open={opendec}
        action={() => diactivateHandler(selectedId)}
        title="Are you sure you want to deactivate this user"
        onClose={handleD}
      ></AlertDialogSlide>

      <AlertDialogSlide
        open={open}
        action={() => deleteHandler(selectedId)}
        title="Are you sure you want to delete this user"
        onClose={handleC}
      ></AlertDialogSlide>

      <Header title="Regional users" subtitle="List of regional users" />
      <Box display="flex" justifyContent="end" mt="0px">
        <Button
          onClick={() => {
            navigate("/createregionalaccount");
          }}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          <AddOutlinedIcon sx={{ mr: "10px" }} />
          Add Regional User
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="60vh"
        width="100%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {!mockdata && (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "70%",
              left: "60%",
              marginTop: `${-40}px`,
              marginLeft: `${-40}px`,
            }}
            color="success"
          />
        )}
        {mockdata && (
          <DataGrid
            // getRowId={(row) => row.id}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            checkboxSelection
            rows={mockdata}
          />
        )}{" "}
      </Box>
    </Box>
  );
};

export default Regionalusers;
