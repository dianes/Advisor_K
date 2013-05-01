var g_hhAcctListGrpFooter;

function getContactListGrid()
{
   // debugger;
   // alert("getContactListGrid");
    var instId=6083;
    var bId=10408149;    
    var param = '{InstID:' + instId + ', BrokerID:' + bId + '}'; 
    $.ajax({ 
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "http://r-sund2/ContactService/Service1.asmx/GetRecentContacts",       
        data: param,
        dataType: "json",
        success: function(dat){       
          //  alert("contactlistgrid success");
            var data= JSON.parse(dat.d);          
        
            $("#contactListGrid").kendoGrid({
                        dataSource: data.List,
                        rowTemplate: kendo.template($("#contactListRowTemplate").html()),
                        
                    });
           
            
            
            },
        error: function(data){
           // alert('contactlistgrid failure:' + data.status + ':' + data.responseText);
            }
        });          
    
}


function getContactList() { 
   
    var instId=6083;
    var bId=10408149;    
    var param = '{InstID:' + instId + ', BrokerID:' + bId + '}';    
      
    $.ajax({ 
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "http://r-sund2/ContactService/Service1.asmx/GetRecentContacts",
       // data: "{'InstID': 6083, 'BrokerID': 10408149}",
        data: param,
        dataType: "json",
        success: function(dat){
         //   debugger;
            var data= JSON.parse(dat.d);
          //         alert("data="+data);    
       /*     alert('success data.d:' + data.d.List);
            var datasrc = data.d.List;
            
            $("#contactlist").kendoMobileListView({
			dataSource: data.d.List,
			template: $("#contact-list-template").html(),
            style: "inset"               
             
		});*/            
        
            
            $.each(data.List, function(key, val){
                var str = val.lname + "," + val.fname;
              //  alert("str=" + str);
                var hhId = val.hh_id;                
                var style= 'class="km-listview-link" data-role="listview-link"';
               // $('<li/>', {text: str}).appendTo($('#contactlist')); 
               /* $('<a href="views/hhSnapshotView.html?hhId='+ hhId + '">' + str + '</a><br/><br/>')
                    .appendTo($('#contactlist')); */
                $('<li><a href="\#hhSnapshotView?hhId='+ hhId + '"' + style + '>' + str + '</a></li>')
                    .appendTo($('#contactlist')); 
            });
            
             /* var output='';
              $.each(data.d.List, function(key, val){
                  var str=val.lname + "," + val.fname;
                  output+='<li>' + str + '</li>';
                  });
               $('#contactlist').append(output).listview('refresh');            
              */
            
            
            },
        error: function(data){
            alert('failure:' + data.status + ':' + data.responseText);
            }
        });  
        
 }


function getHHSnapshot(e){
   // alert("getHHSnapshot");
    var hhId = e.view.params.hhId;
    getHHMembers(hhId);
    getHHAccountList(hhId);
    //getData(onResult);
}


function getHHMembers(hhId) {    
    //var hhId = e.view.params.hhId;
    //alert("getHHSnapshot: hhId=" + hhId);
    var instId=6083;
    var bId=10408149;
    var modId = 120;
    var param = '{InstID:' + instId + ', BrokerID:' + bId + ', ModuleID:' + modId + ', HHID:' + hhId + '}';  
       
    $.ajax({ 
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "http://r-sund2/ContactService/Service1.asmx/GetHHMembers",
       // data: "{'InstID': 6083, 'BrokerID': 10408149, 'ModuleID': 120, 'HHID': 6829146}",
        data: param,
        dataType: "json",
        success: function(dat){
            var data= JSON.parse(dat.d);
            
            $("#hhListGrid").empty().kendoGrid({
                     dataSource: data.List,
                     selectable: "multiple cell",                       
                        sortable: true,                 
                     columns: [
                     {
                         field: "name",
                         title: "Name"                         
                     },
                     {    
                         field: "type",
                         title: "Household Relationship"                         
                     }
                 ]
               });
            
            
           // debugger;
            var output = "";
            $.each(data.List, function(key, val){
                var name = val.name;
                var type = val.type;
                output+='<li>' + name + "    " + type + "</li>";
               // alert("output="+output);                
             });
            
            $('#hhlist').empty().append(output);
          
           
            

        },
        error: function(data){
            alert('failure:' + data.status + ':' + data.responseText);
            }
        });
    }
    
 function getHHAccountList(hhId){
   //  var hhId=6829146;
    var instId=6083;
    var bId=10408149;
    var modId = 120;
    var param = '{InstID:' + instId + ', BrokerID:' + bId + ', ModuleID:' + modId + ', HHID:' + hhId + '}';  
     
     $.ajax({ 
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "http://r-sund2/ContactService/Service1.asmx/GetHHAccountList",
       // data: "{'InstID': 6083, 'BrokerID': 10408149, 'ModuleID': 120, 'HHID': 6829146}",
        data: param,
        dataType: "json",
        success: function(dat){ 
           // alert("getHHAccountList success");
            var data= JSON.parse(dat.d);
            
            //create datasource
          // var dataSource = new kendo.data.DataSource({data: data.BusinessObjects});
            
         // debugger;  
          //  var raw = dataSource.data();
            var length = data.BusinessObjects.length;
            var intDataSource = [];
            var extDataSource = [];
            var item, i;
            var intIndex = 0;
            var extIndex = 0;
            for(i=0;i<length;i++){
                item = data.BusinessObjects[i];
                if(item.InternalValue == true){
                    intDataSource[intIndex] = item;
                    intIndex++;
                    }
                else{
                    extDataSource[extIndex] = item;
                    extIndex++;
                }
                    
            }
            
          
             $("#intAcctGrid").empty().kendoGrid({
                     dataSource: intDataSource,
                     selectable: "multiple cell",                       
                        sortable: true,                 
                     columns: [
                     {
                         field: "Account_number",
                         title: "Acct.#"                         
                     },
                     {    
                         field: "Owner_name",
                         title: "Owner Name"                         
                     },
                     {
                         field: "Nature_of_acct",
                         title: "Acct.Type"                         
                     }
                 ]
            
                 });
            
            $("#extAcctGrid").empty().kendoGrid({
                     dataSource: extDataSource,
                     selectable: "multiple cell",                       
                        sortable: true,                 
                     columns: [
                     {
                         field: "Account_number",
                         title: "Acct.#"                         
                     },
                     {    
                         field: "Owner_name",
                         title: "Owner Name"                         
                     },
                     {
                         field: "Nature_of_acct",
                         title: "Acct.Type"
                         
                     }
                 ]
            
                 });
            
            /*$("#grid").kendoGrid({
                        dataSource: {
                            transport: {
                                read: {
                                    url: "http://demos.kendoui.com/service/Products",
                                    dataType: "jsonp"
                                }
                            },
                            pageSize: 5
                        },
                     //   change: onChange,
                     //   dataBound: onDataBound,
                     //   dataBinding: onDataBinding,
                        selectable: "multiple cell",
                        pageable: true,
                        sortable: true,
                        scrollable: false,
                        columns: [
                            {
                                field: "ProductName",
                                title: "Product Name"
                            },
                            {
                                field: "UnitPrice",
                                title: "Unit Price",
                                format: "{0:c}"
                            },
                            {
                                field: "UnitsInStock",
                                title: "Units In Stock"
                            }
                        ]
                    });
          */
                
        },
        error: function(data){
            alert('getHHAccountList failure:' + data.status + ':' + data.responseText);
            }
        });
 }

function getData(callback) {
    debugger;
    alert("getData");
            var template =  kendo.template($("#contact-list-template").html());
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: JSON.parse('http://r-sund2/ContactService/Service1.asmx/GetRecentContacts?instId=6083&brokerid=10408149'),
                        dataType: "jsonp" // JSONP (JSON with padding) is required for cross-domain AJAX
                    }
                },
               schema: {
                    data: "List"
                },
                error: function(e) {
                    console.log("Error " + e);
                },
                change: function() {
                    alert("change");
                    $("#contactlist").html(kendo.render(template, this.view()));
                }
            });
           // dataSource.sort = ({field: "Distance", dir: "asc"});
            dataSource.read();
            $("#contactlist").kendoMobileListView({dataSource:dataSource,template: $("#contact-list-template").html()});
        }
 
        function onResult(resultData) {
            var data = JSON.parse(resultData);
            alert("Results");
            console.log("parsed Results " + data);
            $("#contactlist").kendoMobileListView({dataSource: kendo.data.DataSource.create({data:data,sort: { field: "Distance", dir: "asc" }}),
                template: $("#contact-list-template").html()});
}


//contact search
function searchContact()
{    
    var instId=6083;
    var bId=10408149;
    var searchFor;
    var searchBy;
    var action;
    var url, param;
    var queryStr = "";
    var cInputs = $("input:checked");
    var txtLname = document.getElementById("txtLname").value;
    var txtFname = document.getElementById("txtFname").value;
    var txtCity = document.getElementById("txtCity").value;
    var txtState = document.getElementById("txtState").value;
    var txtZip = document.getElementById("txtCity").value;
     
    $("#contactSearchResultGrid").empty();
    if(cInputs != null){
        for(var pvt=0;pvt<cInputs.length;pvt++){
            if(cInputs[pvt].name=="srchFor"){
                searchFor = cInputs[pvt].value;                
            }
            else if(cInputs[pvt].name =="srchBy"){
                action = cInputs[pvt].value;
                if(action == "srchByDemo"){
                    queryStr = "<firstname>" + txtFname + "</firstname>";
                    queryStr += "<lastname>" + txtLname + "</lastname>";
                    queryStr += "<city>" + txtCity + "</city>";
                    queryStr += "<state>" + txtState + "</state>";
                    queryStr += "<zip>" + txtZip + "</zip>";

                    param = '{InstID:' + instId + ', BrokerID:' + bId + ', SearchFor:"' + searchFor + 
                        '", SearchQRY:"' + queryStr + '", page: 1, itemCount: 25, sortColumn: "Name", isAscending: true' +  '}'; 
                    url = "http://r-sund2/ContactService/Service1.asmx/SearchByDemographic"; 
                }
                else if(action == "srchByAcctno"){
                    //queryStr = "<acctno>" +
                }
                
                
            }
        }
        
        $.ajax({ 
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url,       
        data: param,
        dataType: "json",
        success: function(dat){
            $("#tblDiv .k-grid-header").remove();         
            var data= JSON.parse(dat.d);
        
            $("#contactSearchResultGrid").kendoGrid({
                        dataSource: data.List,
                       // pageable: true,
                        selectable: "multiple cell",
                        sortable: true,
                        columns: [
                     {
                         field: "lname",
                         title: "Name"                         
                     },
                     {    
                         field: "type",
                         title: "Type"                         
                     },
                     {
                         field: "acct_no",
                         title: "Acct.#"                         
                     },
                      {
                         field: "phone",
                         title: "Phone"                         
                     },
                     {
                         field: "city",
                         title: "City"                         
                     },
                    {
                         field: "state",
                         title: "State"                         
                     },
                     {
                         field: "zip",
                         title: "Zip"                         
                     }, 
                    {
                         
                         title: "Action"                         
                     },
                 ],
                        rowTemplate: kendo.template($("#contactSearchResultRowTemplate").html()),
                        
                        
                    }).show();
          
            },
        error: function(data){
            alert('searchResult failure:' + data.status + ':' + data.responseText);
            }
        });     
    } 
}


function getHHProfile(e)
{
    var hhId = e.view.params.hhId;
    getAccountsInfo(hhId);
    getContactsInfo(hhId);
    
}


function getContactsInfo(hhId)    
{     
  //  alert("getContactsInfo");
    $("#hhProfileListGrid").empty();
    //var hhId = e.view.params.hhId;
    var instId=6083;
    var bId=10408149; 
    var param = '{InstID:' + instId + ', BrokerID:' + bId + ', propId: 0, partyId:' + hhId + '}';  
    $.ajax({ 
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "http://r-sund2/ContactService/Service1.asmx/GetContactDetails",
       // data: "{'InstID': 6083, 'BrokerID': 10408149}",
        data: param,
        dataType: "json",
        success: function(dat){
           // debugger;
            var data= JSON.parse(dat.d);
    
            var scriptTemplate = kendo.template($("#contactDetailTemplate").html());
         /*   if(data.List.length > 0){           
                    additionalcontact = data.List[1].fname + " " + data.List[1].lname;
                    scriptTemplate = scriptTemplate(additionalcontact);
                }*/
            
            $("#hhProfileListGrid").html(scriptTemplate(data.List[0]));
            
            },
        error: function(data){
            alert('failure:' + data.status + ':' + data.responseText);
            }
        });  
}


function getAccountsInfo(hhId)
{
  //  alert("getAccountsInfo");
    $("#hhAccountInfo").empty();
    var param = '{planId: 0, householdId:' + hhId + '}'; 
    $.ajax({ 
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "http://r-sund2/ContactService/Service1.asmx/GetAccountHHSnapshot",       
        data: param,
        dataType: "json",
        success: function(dat){          
            var data= JSON.parse(dat.d);
    
            $("#hhAccountInfo").kendoGrid({
                                dataSource: {data: data.HHAcctInfoList.List,
                                 group: {
                                     field:"InternalValue", 
                                     dir:"desc",
                                     aggregates:[
                                             { field:"MarketValue",aggregate:"sum"}
                                     ]
                                 }
                    },                                
                    columns: [
                        {
                            field: "AccountNumber",
                            title: "Acct.#"
                        },
                        {
                            field: "AccountName",
                            title: "Account Name"
                        },
                        {
                            field: "OwnerName",
                            title: "Owner"
                        },
                        {
                            field: "NatureOfAccount",
                            title: "Acct. Type"
                        },
                        {
                            field: "DiscretionaryType", values: [{text: "Non-Discretionary", value: "n"},
                                                                 {text: "Discretionary", value:"y"}],
                            title: "Discretion"                           
                        },
                        {
                            field: "ProgramName",
                            title: "Product Class",
                            groupFooterTemplate:"#= g_hhAcctListGrpFooter #",
                            footerTemplate: "Total Value:"
                        },
                        {
                            field: "MarketValue",
                            title: "MV*",
                            groupFooterTemplate: "#= kendo.toString(sum,'c') #",
                            footerTemplate:"#= getTotal() #",
                            format: "{0:c}"
                        },
                        {
                            field: "RebalanceStatus",
                            title: "Rebal Status"
                        }, 
                        {
                            title: "Actions"
                        },
                        {
                            hidden: true, 
                            field: "InternalValue",
                            groupHeaderTemplate: "#= getGroupHeader(value) #"                          
                        }                   
                    ],
                });
            },
        error: function(data){
            alert('failure:' + data.status + ':' + data.responseText);
            }
        });  
}

function getGroupHeader(value)
{ 
    /*******************************************************************************************
      groupFooterTemplate doesn't contain info about "group by" field and value. 
      As a workaround, suggested by Telerik team, retrieve this info through groupHeaderTemplate
      (groupHeaderTemplate is executed before groupFooterTemplate).  
      Note here g_hhAcctListGrpFooter is a global variable 
    ********************************************************************************************/
    if(value=="Y"){
        g_hhAcctListGrpFooter = "Internal Total:";
        return "Internal Accounts";        
    }
    else{
        g_hhAcctListGrpFooter = "External Total:";
        return "External Accounts";
    }
}

function getTotal()
{    
    var dataSource = $("#hhAccountInfo").data("kendoGrid").dataSource;
    var result = 0;

    //loops through dataSource view
    $(dataSource.view()).each(function(index,element){
        result += element.aggregates.MarketValue.sum;
    });
    return kendo.toString(result, 'C');
}

     
