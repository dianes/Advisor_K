
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
          //         alert("data="+data);    
       /*     alert('success data.d:' + data.d.List);
            var datasrc = data.d.List;
            
            $("#contactlist").kendoMobileListView({
			dataSource: data.d.List,
			template: $("#contact-list-template").html(),
            style: "inset"               
             
		});*/            
        
            
           /* $.each(data.List, function(key, val){
                var str = val.lname + "," + val.fname;              
                var hhId = val.hh_id;                
                var style= 'class="km-listview-link" data-role="listview-link"';               
                $('<li><a href="\#hhSnapshotView?hhId='+ hhId + '"' + style + '>' + str + '</a></li>')
                    .appendTo($('#contactlist')); 
            }); */
        
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

function getContactListsss(){
    alert("getcontact");
    /*$.getJSON("http://r-sund2/ContactService/Service1.asmx/GetRecentContacts?instId=6083&brokerid=10408149", 
        function(data){
            alert("data="+data);
            debugger;
            $.each(data, function(key, val){
                
               //  var str = val.lname + "," + val.fname;
                
            });
        });*/
    $.getJSON("http://r-sund2/ContactService/Service1.asmx/GetRecentContacts?instId=6083&brokerid=10408149")
    .done(function(data){
        alert("success data="+ data);
    })
    .fail(function(jqxhr, textStatus, error){
        var err =textStatus + ' ' + error;
        alert("error:" + err);
    });
}

function getContactList() { 
   
    var instId=6083;
    var bId=10408149;    
    var param = '{InstID:' + instId + ', BrokerID:' + bId + '}';    
  //  alert("param="+JSON.stringify(param));  
    
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

    /*function(data) { 
        console.log("data: " + data);
        debugger;
		$("#subreddit-data").kendoMobileListView({
			dataSource: data.data.children,
			template: $("#subreddit-data-template").html(),
            style: "inset"
		});
    });*/




function getHHSnapshot(e){
  //  alert("getHHSnapshot");
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
   // alert("getHHMembers param=" + param);
    
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
   // alert("getHHAccountList param=" + param);
     
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
            
                       
            
           /* debugger;
            var int_output = "";
            var ext_output = "";
            debugger;
            $.each(data.BusinessObjects, function(key, val){
                var acctNo = val.Account_number;                
                var owner = val.Owner_name;                
                var type = val.Nature_of_acct;                
                var isInternal = val.InternalValue;
                
                if(isInternal==true){
                    int_output+='<li>' + acctNo + "    " + owner + "   "  + type + "</li>";                    
                    }
                else{
                    ext_output+='<li>' + acctNo + "    " + owner + "   "  + type + "</li>";  
                    }
             });
            alert("int_output="+ int_output);
            alert("ext_output="+ ext_output);
            $('#intAccts').empty().append(int_output);
            $('#extAccts').empty().append(ext_output);   */
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
