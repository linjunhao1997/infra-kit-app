import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import axios from "@/utils/axios";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

interface ResData {
  id: string;
  code: string;
  name: string;
}

export default function OrgUpdater() {
  const navigate = useNavigate();

  let { id } = useParams();
  const dataQuery = useQuery(["data"], () =>
    axios({
      method: "get",
      url: "/apis/v1/services/iam/orgs/" + id,
    }), {
      refetchOnMount: true,
    }
  );

  const [code, setCode] = React.useState<null | string>(null);
  const [name, setName] = React.useState<null | string>(null);
  const { isLoading: isUpdatingOrg, mutate: updateOrg } = useMutation<
    any,
    Error
  >(() => {
    return axios({
      method: "patch",
      url: "/apis/v1/services/iam/orgs/" + id,
      data: {
        code: code,
        name: name,
      },
    }).then(() => {
      dataQuery.refetch()
    });
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateOrg();
  };

  if (dataQuery.isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <CircularProgress variant="soft" />
      </Box>
    );
  }

  const resData: ResData = dataQuery.data?.data;

  return (
    <>
      <span
        onClick={() => {
          navigate(-1);
        }}
      >
        <KeyboardBackspaceIcon color="primary" />
      </span>
      <form onSubmit={handleSubmit} id="demo">
        <FormControl>
          <FormLabel>组织标识</FormLabel>
          <Input
            placeholder="组织标识"
            defaultValue={resData.code}
            onChange={(e) => setCode(e.target.value)}
          />
          <FormHelperText>输入组织标识.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>组织名称</FormLabel>
          <Input
            placeholder="组织名称"
            defaultValue={resData.name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormHelperText>输入组织名称</FormHelperText>
        </FormControl>

        <Button
        variant="solid"
        color="primary"
        loading={isUpdatingOrg}
        type="submit"
      >
        保存
      </Button>
      </form>
     
    </>
  );
}