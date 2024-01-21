import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import { useNavigate, useParams } from "react-router-dom";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import axios from "@/utils/axios";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import React, { useState } from "react";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Checkbox from "@mui/joy/Checkbox";
import { listAuthority } from "@/services/iam";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";

interface ResData {
  id: string;
  code: string;
  name: string;
  authorityIds: string[];
}

export default function NamespaceUpdater() {
  const navigate = useNavigate();

  let { id } = useParams();
  const dataQuery = useQuery(["data"], () =>
    axios({
      method: "get",
      url: "/apis/v1/services/iam/groups/" + id,
      params: {
        withAuthorityIds: true,
      },
    }), {
      refetchOnMount: true,
    }
  );

  const [code, setCode] = React.useState<null | string>(null);
  const [name, setName] = React.useState<null | string>(null);
  const [addAuthorityIds, setAddAuthorityIds] = useState<string[]>([]);
  const [removeAuthorityIds, setRemoveAddAuthorityIds] = useState<string[]>([]);

  const { isLoading: isUpdatingGroup, mutate: updateGroup } = useMutation<
    any,
    Error
  >(() => {
    return axios({
      method: "patch",
      url: "/apis/v1/services/iam/groups/" + id,
      data: {
        code: code,
        name: name,
        addAuthorityIds: addAuthorityIds,
        removeAuthorityIds: removeAuthorityIds,
      },
    }).then(() => {
      dataQuery.refetch()
    });
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateGroup();
  };

  const setIds = (addAuthorityIds: string[], removeAuthorityIds: string[]) => {
    setAddAuthorityIds(addAuthorityIds);
    setRemoveAddAuthorityIds(removeAuthorityIds);
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
          <FormLabel>标识</FormLabel>
          <Input
            placeholder="用户组标识"
            defaultValue={resData.code}
            onChange={(e) => setCode(e.target.value)}
          />
          <FormHelperText>输入用户组标识.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>组名</FormLabel>
          <Input
            placeholder="用户组名"
            defaultValue={resData.name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormHelperText>输入用户组名</FormHelperText>
        </FormControl>

        <Authorities checkedIds={resData.authorityIds} setIds={setIds} />
        <Button
        variant="solid"
        color="primary"
        loading={isUpdatingGroup}
        type="submit"
      >
        保存
      </Button>
      </form>
     
    </>
  );
}

interface AuthoritiesProps {
  checkedIds: string[];
  setIds: (addAuthorityIds: string[], removeAuthorityIds: string[]) => void;
}
function Authorities({ checkedIds, setIds }: AuthoritiesProps) {
  const [removeAuthorityIds, setRemoveAuthorityIds] = useState<string[]>([]);
  const [addAuthorityIds, setAddAuthorityIds] = useState<string[]>([]);

  const checkedIdSet = new Set(checkedIds);

  const fetchRepositories = async (page: string) => {
    return await listAuthority({ groupId: "", pageSize: 5, pageToken: page });
  };

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      "repos",
      ({ pageParam = "" }) => fetchRepositories(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage?.pagination.nextPageToken === "") {
            return undefined;
          }
          return lastPage.pagination.nextPageToken;
        },
      }
    );

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
                    if (checkedIdSet.has(data?.id) && !e.target.checked) {
                      removeAuthorityIds.push(data?.id);
                      const set = new Set(removeAuthorityIds);
                      setRemoveAuthorityIds([...set]);
                      setIds(addAuthorityIds, [...set]);
                    } else if (
                      !checkedIdSet.has(data?.id) &&
                      e.target.checked
                    ) {
                      addAuthorityIds.push(data?.id);
                      const set = new Set(addAuthorityIds);
                      setAddAuthorityIds([...set]);
                      setIds([...set], removeAuthorityIds);
                    } else {
                      const addSet = new Set(addAuthorityIds);
                      addSet.delete(data?.id);
                      setAddAuthorityIds([...addSet]);
                      const removeSet = new Set(removeAuthorityIds);
                      removeSet.delete(data?.id);
                      setRemoveAuthorityIds([...removeSet]);
                      setIds([...addSet], [...removeSet]);
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
