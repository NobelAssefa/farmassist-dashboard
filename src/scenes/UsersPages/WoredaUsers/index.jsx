import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { CircularProgress } from "@mui/material";
// import { fetchData } from "../../../config/apicalls/usersapi";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AlertDialogSlide from "../../global/dialogue";

import { get_all_woredas } from "../../../config/apicalls/woredaApiCalls";
const WoredaUsers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mockdata, setMockdata] = useState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleC = () => {
    setOpen(!open);
  };
  const editHandler = (u_id) => {
    navigate(`/updateworedauser/${u_id}`);
  };

  useEffect(() => {
    get_all_woredas().then((res) => {
      if (res.success && res.data) {
        console.log(res.data);
        setMockdata(res.data);
      } else {
        console.log(res.error);
      }
    });
  }, []);

  const columns = [
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
      flex: 0.8,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row?.user?.userprofile?.sex,
      disableColumnFilter: true,
    },

    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      valueGetter: (params) => params.row?.user?.userprofile?.phone,
      disableColumnFilter: true,
    },
    {
      field: "woreda_name",
      headerName: "Woreda",
      // flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      valueGetter: (params) => params.row?.user?.email,
      disableColumnFilter: true,
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
              m="0 15px 0 0 "
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
              pl={"10px"}
              display="flex"
              justifyContent="center"
              backgroundColor={colors.redAccent[500]}
              borderRadius="4px"
            >
              <Button onClick={handleC} variant="text">
                <Delete></Delete>
              </Button>
            </Box>
            <Box
              width="60%"
              m="0 15px 0 0 "
              pl={"10px"}
              display="flex"
              justifyContent="center"
              backgroundColor={colors.greenAccent[600]}
              borderRadius="4px"
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
      <Header title="Woreda users" subtitle="List of Woreda users" />
      <AlertDialogSlide open={open} onClose={handleC}></AlertDialogSlide>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button
          onClick={() => {
            navigate("/createworedaaccount");
          }}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          <AddOutlinedIcon sx={{ mr: "10px" }} />
          Add Woreda User
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
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
            components={{ Toolbar: GridToolbar }}
            checkboxSelection
            rows={mockdata}
            columns={columns}
          />
        )}{" "}
      </Box>
    </Box>
  );
};

export default WoredaUsers;
