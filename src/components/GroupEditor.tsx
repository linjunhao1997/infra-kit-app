import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import axios from "@/utils/axios";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import React from "react";

interface ResData {
  id: string;
  code: string;
  name: string;
}

export default function GroupEditor() {
  let { id } = useParams();
  const dataQuery = useQuery(["data"], () =>
    axios({
      method: "get",
      url: "/apis/v1/services/iam/groups/" + id,
    })
  );

  const [data, setData] = React.useState<{
    code: string;
    name: string;
  }>({
    code: dataQuery.data?.data?.code,
    name: dataQuery.data?.data?.name,
  });

  const { isLoading: isUpdatingGroup, mutate: updateGroup } = useMutation<any, Error>(
    async () => {
      return await axios({
        method: "patch",
        url: "/apis/v1/services/iam/groups/" + id,
        data: data
      })
    },
    {
      onSuccess: (res) => {
        console.log(res)
      },
      onError: (err: any) => {
        console.log(err)
      },
    }
  );




  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateGroup()
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
    <form onSubmit={handleSubmit} id="demo">
      <FormControl>
        <FormLabel>标识</FormLabel>
        <Input placeholder="用户组标识" defaultValue={resData.code} onChange={(e) => setData({...resData, code: e.target.value})}/>
        <FormHelperText>输入用户组标识.</FormHelperText>
        <FormLabel>组名</FormLabel>
        <Input placeholder="用户组名" defaultValue={resData.name} onChange={(e) => setData({...resData, name: e.target.value})}/>
        <FormHelperText>输入用户组名</FormHelperText>
        <Button
          variant="solid"
          color="primary"
          loading={isUpdatingGroup}
          type="submit"
        >
          保存
        </Button>
      </FormControl>
    </form>
  );
}
