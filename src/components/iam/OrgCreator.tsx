import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import Button from "@mui/joy/Button";
import React from "react";
import { createOrg } from "@/services/iam";


export default function OrgCreator() {
  const navigate = useNavigate();

  const [code, setCode] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");

  const { isLoading, mutate } = useMutation<
    any,
    Error
  >(() => createOrg({code: code, name: name}));

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
          <FormLabel>组织标识</FormLabel>
          <Input
            placeholder="组织标识"
            defaultValue={""}
            onChange={(e) => setCode(e.target.value)}
          />
          <FormHelperText>输入组织标识</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>组织名称</FormLabel>
          <Input
            placeholder="组织名称"
            defaultValue={""}
            onChange={(e) => setName(e.target.value)}
          />
          <FormHelperText>输入组织名称</FormHelperText>
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