import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import Button from "@mui/joy/Button";
import React from "react";
import { createUser } from "@/services/iam";


export default function UserCreator() {
  const navigate = useNavigate();

  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");


  const { isLoading, mutate } = useMutation<
    any,
    Error
  >(() => createUser({email: email, name: name}));

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
          <FormLabel>邮箱</FormLabel>
          <Input
            placeholder="邮箱"
            defaultValue={""}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormHelperText>输入邮箱</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>用户名</FormLabel>
          <Input
            placeholder="用户名"
            defaultValue={""}
            onChange={(e) => setName(e.target.value)}
          />
          <FormHelperText>输入用户名</FormHelperText>
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