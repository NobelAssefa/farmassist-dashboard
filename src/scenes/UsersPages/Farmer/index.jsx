import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { CircularProgress } from "@mui/material";
import { get_all_farmers } from "../../../config/apicalls/Farmerapicalls";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AlertDialogSlide from "../../global/dialogue";

const Farmer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mockdata, setMockdata] = useState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleC = () => {
    setOpen(!open);
  };

  useEffect(() => {
    get_all_farmers().then((res) => {
      if (res.success && res.data) {
        console.log(res.data);
        setMockdata(res.data);
      } else {
        console.log(res.error);
      }
    });
  }, []);

  const editHandler = (u_id) => {
    navigate(`/updatefarmer/${u_id}`);
  };

  const columns = [
    { field: "id", headerName: "ID",   flex: 0.5,},
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
      field: "land_size",
      headerName: "Land Size",
      flex: 1,
      valueGetter: (params) => params.row?.land_size,
      disableColumnFilter: true,
    },
    
    {
      field: "land_map_id",
      headerName: "Land Map Id",
      flex: 1,
      valueGetter: (params) => params.row?.land_map_id,
      disableColumnFilter: true,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
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
      <AlertDialogSlide open={open} onClose={handleC}></AlertDialogSlide>
      <Header title="Farmer users" subtitle="List of Farmer users" />
      <Box display="flex" justifyContent="end" mt="0px">
        <Button
          onClick={() => {
            navigate("/farmerRegistration");
          }}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          <AddOutlinedIcon sx={{ mr: "10px" }} />
          Register Farmer
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

export default Farmer;
