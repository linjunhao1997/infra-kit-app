import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "@/utils/axios";
import Button from "@mui/joy/Button";
import React from "react";


export default function AuthorityCreator() {
  const navigate = useNavigate();

  const [code, setCode] = React.useState<null | string>(null);
  const [name, setName] = React.useState<null | string>(null);

  const { isLoading: isCreatingAuthority, mutate: createAuthority } = useMutation<
    any,
    Error
  >(() => {
    return axios({
      method: "post",
      url: "/apis/v1/services/iam/authorities",
      data: {
        code: code,
        name: name,
      },
    })
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createAuthority();
  };

  return (
    <>
      <span
        onClick={() => {
          navigate(-1);
        }}
      >
      </span>
      <form onSubmit={handleSubmit} id="demo">
        <FormControl>
          <FormLabel>权限code</FormLabel>
          <Input
            placeholder="权限code"
            defaultValue={""}
            onChange={(e) => setCode(e.target.value)}
          />
          <FormHelperText>输入权限code</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>权限名</FormLabel>
          <Input
            placeholder="权限名"
            defaultValue={""}
            onChange={(e) => setName(e.target.value)}
          />
          <FormHelperText>输入权限名</FormHelperText>
        </FormControl>

        <Button
        variant="solid"
        color="primary"
        loading={isCreatingAuthority}
        type="submit"
      >
        保存
      </Button>
      </form>
     
    </>
  );
}