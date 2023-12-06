import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import Button from "@mui/joy/Button";
import React from "react";
import { createGroup } from "@/services";
import { useSelector } from "react-redux";
import { RootState } from "@/store";


export default function GroupCreator() {
  const navigate = useNavigate();
  const userSession = useSelector((state: RootState) => state.userinfo.userSession)

  const [code, setCode] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");


  const { isLoading, mutate } = useMutation<
    any,
    Error
  >(() => createGroup({orgCode: userSession.orgCode, code: code, name: name, description: description}));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
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
          <FormLabel>用户组标识</FormLabel>
          <Input
            placeholder="用户组标识"
            defaultValue={""}
            onChange={(e) => setCode(e.target.value)}
          />
          <FormHelperText>输入用户组标识</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>用户组名</FormLabel>
          <Input
            placeholder="用户组名"
            defaultValue={""}
            onChange={(e) => setName(e.target.value)}
          />
          <FormHelperText>输入用户组名</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>备注</FormLabel>
          <Input
            placeholder="备注"
            defaultValue={""}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormHelperText>备注</FormHelperText>
        </FormControl>

        <Button
        variant="solid"
        color="primary"
        loading={isLoading}
        type="submit"
      >
        保存
      </Button>
      </form>
     
    </>
  );
}