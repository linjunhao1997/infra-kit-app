import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import { useNavigate, useParams } from "react-router-dom";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import React, {createContext, useContext, useState } from "react";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Checkbox from "@mui/joy/Checkbox";
import { getGroup, listAuthority } from "@/services/iam";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import { updateGroup } from "@/services/iam";

interface groupUpdaterContextProps {
  authorityIds: string[];
  addAuthorityIds: string[];
  setAddAuthorityIds: React.Dispatch<React.SetStateAction<string[]>>
  removeAuthorityIds: string[];
  setRemoveAuthorityIds: React.Dispatch<React.SetStateAction<string[]>>
}

const initialGroupUpdaterContextProps: groupUpdaterContextProps = {
  authorityIds: [],
  addAuthorityIds: [],
  setAddAuthorityIds: () => {},
  removeAuthorityIds: [],
  setRemoveAuthorityIds: () => {},
};

const groupUpdaterContext = createContext<groupUpdaterContextProps>(initialGroupUpdaterContextProps)

export default function GroupUpdater() {
  const navigate = useNavigate();
  let { id } = useParams();
  const dataQuery = useQuery(["data"], () => getGroup(id as string, true), {
    refetchOnMount: true,
  });

  const [code, setCode] = React.useState<undefined | string>();
  const [name, setName] = React.useState<undefined | string>();
  const [addAuthorityIds, setAddAuthorityIds] = useState<string[]>([]);
  const [removeAuthorityIds, setRemoveAuthorityIds] = useState<string[]>([]);

  const { isLoading, mutate } = useMutation<any, Error>(async () => {
    await updateGroup(id as string, {
      code: code,
      name: name,
      addAuthorityIds: addAuthorityIds,
      removeAuthorityIds: removeAuthorityIds,
    });
    dataQuery.refetch();
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

 /*  const setIds = (addAuthorityIds: string[], removeAuthorityIds: string[]) => {
    setAddAuthorityIds(addAuthorityIds);
    setRemoveAddAuthorityIds(removeAuthorityIds);
    console.log("add", addAuthorityIds);
    console.log("remove", removeAuthorityIds);
  }; */

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

  const resData = dataQuery.data;

  return (
  <groupUpdaterContext.Provider value={{
    authorityIds: resData?.authorityIds as string[],
    addAuthorityIds, 
    setAddAuthorityIds, 
    removeAuthorityIds, 
    setRemoveAuthorityIds}}>
    <span
        onClick={() => {
          navigate(-1);
        }}
      >
        <KeyboardBackspaceIcon color="primary" />
      </span>
      <form onSubmit={handleSubmit} id="demo">
        <FormControl>
          <FormLabel>标识</FormLabel>
          <Input
            placeholder="用户组标识"
            defaultValue={resData?.code}
            onChange={(e) => setCode(e.target.value)}
          />
          <FormHelperText>输入用户组标识.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>组名</FormLabel>
          <Input
            placeholder="用户组名"
            defaultValue={resData?.name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormHelperText>输入用户组名</FormHelperText>
        </FormControl>
        <Authorities  />
        <Button
          variant="solid"
          color="primary"
          loading={isLoading}
          type="submit"
        >
          保存
        </Button>
      </form>
    </groupUpdaterContext.Provider>
  );
}

function Authorities() {
  const {authorityIds, addAuthorityIds, setAddAuthorityIds, removeAuthorityIds, setRemoveAuthorityIds} = useContext(groupUpdaterContext)

  const [checkedIdSet] = useState(new Set(authorityIds));

  const fetchData = async (pageToken: string) => {
    return await listAuthority({
      groupId: "",
      pageSize: 5,
      pageToken: pageToken,
    });
  };

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery("repos", ({ pageParam = "" }) => fetchData(pageParam), {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.pagination.nextPageToken === "") {
          return undefined;
        }
        return lastPage.pagination.nextPageToken;
      },
    });

  return (
    <div>
      <Typography id="sandwich-group" level="body-sm" fontWeight="lg" mb={1}>
        权限集
      </Typography>
      <div role="authorities" aria-labelledby="sandwich-group">
        <List size="sm">
          {data?.pages.map((page) =>
            page?.items.map((data) => (
              <ListItem>
                <Checkbox
                  label={data?.name}
                  defaultChecked={checkedIdSet.has(data?.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      addAuthorityIds.push(data?.id);
                      const removeSet = new Set(removeAuthorityIds);
                      removeSet.delete(data?.id);
                      const addSet = new Set(addAuthorityIds);
                      setAddAuthorityIds([...addSet]);
                      setRemoveAuthorityIds([...removeSet]);
                    } else {
                      removeAuthorityIds.push(data?.id);
                      const addSet = new Set(addAuthorityIds);
                      addSet.delete(data?.id);
                      const removeSet = new Set(removeAuthorityIds);
                      setAddAuthorityIds([...addSet]);
                      setRemoveAuthorityIds([...removeSet]);
                    }
                  }}
                />
              </ListItem>
            ))
          )}
          {hasNextPage ? (
            <span
              onClick={() => {
                fetchNextPage();
              }}
            >
              <MoreHorizSharpIcon titleAccess="更多" />
            </span>
          ) : null}
        </List>
      </div>
    </div>
  );
}
